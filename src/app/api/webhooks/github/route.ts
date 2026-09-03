import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { runAgentWorkflow } from '../../../../agents/graph';

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('x-hub-signature-256');

    // Verify webhook signature
    const secret = process.env.GITHUB_WEBHOOK_SECRET;
    if (secret && signature) {
      const hmac = crypto.createHmac('sha256', secret);
      const digest = 'sha256=' + hmac.update(payload).digest('hex');
      if (signature !== digest) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const event = request.headers.get('x-github-event');
    const data = JSON.parse(payload);

    if (event === 'issues' && (data.action === 'opened' || data.action === 'edited')) {
      const issue = data.issue;
      const repository = data.repository;
      
      console.log(`[Webhook] Issue ${data.action}: ${issue.title} in ${repository.full_name}`);
      
      // Trigger LangGraph agent workflow asynchronously so we don't block the webhook response
      runAgentWorkflow(repository.owner.login, repository.name, issue.number, issue.title, issue.body).catch(console.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
