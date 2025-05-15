import sendEmail from '$mail/sendEmail';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
  const { to, name } = await request.json();
  console.log('/POST api/email/welcome', to, name);

  if (!to || !name) {
    return json({ success: false, message: 'Name and To are required fields' }, { status: 400 });
  }

  const emailData = [
    {
      from: `"Best from RiOS Academy" <notify@mail.academy.rios.com.ai>`,
      to,
      subject: 'Welcome to RiOS Academy!',
      content: `
    <p>Dear ${name},</p>
      <p>My name is Best, the founder of RiOS Academy. I saw you signed up, any questions so far?</p>
      <p>
       Would you like to get a walkthrough of the tool in a 30 minutes product demo? It's free and we won't try to sell you anything, just want to learn from your use case and show you all the cool features and flows we thought about.
      </p>
      <p>
        Interested? just book a 30mn demo slot in our calendar!
      </p>
      <div>
        <a href="https://academy.rios.com.ai/demo">Book demo</a>
      </div>
      <p>
        PS: I reply personally to every email. We don't have an outsourced support team at the other end of the globe.. ;-)
      </p>
    `
    }
  ];

  await sendEmail(emailData);

  return json({
    success: true,
    message: 'Email sent'
  });
}
