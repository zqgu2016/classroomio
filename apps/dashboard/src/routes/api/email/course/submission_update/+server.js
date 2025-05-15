import sendEmail from '$mail/sendEmail';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { to, content, orgName } = await request.json();

  if (!to || !content || !orgName) {
    return json({ success: false, message: 'Missing required fields' }, { status: 400 });
  }

  const emailData = [
    {
      from: `"${orgName} (via academy.rios.com.ai)" <notify@mail.academy.rios.com.ai>`,
      to,
      subject: 'Submission Update',
      content
    }
  ];

  await sendEmail(emailData);

  return json({
    success: true,
    message: 'Email sent'
  });
}
