import { Resend } from 'resend'

// Lazy init to avoid build errors when API key not set
let resend: Resend | null = null
function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

export async function POST(req: Request) {
  try {
    const { email, name, message, type } = await req.json()
    const resend = getResend()
    
    if (!resend) {
      return Response.json({ 
        success: false, 
        error: 'Email service not configured. Set RESEND_API_KEY.',
        fallback: { email, name, message, type, timestamp: new Date().toISOString() }
      })
    }
    
    if (type === 'contact') {
      // Contact form submission
      await resend.emails.send({
        from: 'OMA-AI <contact@oma-ai.com>',
        to: 'frankie@agentmail.to',
        subject: `New Contact: ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      })
      
      // Store lead in database or log
      console.log('New lead:', { email, name, timestamp: new Date().toISOString() })
      
      return Response.json({ success: true, message: 'Email sent' })
    }
    
    if (type === 'signup') {
      // New signup/lead
      await resend.emails.send({
        from: 'OMA-AI <noreply@oma-ai.com>',
        to: email,
        subject: 'Welcome to OMA-AI',
        html: `
          <h2>Welcome to OMA-AI!</h2>
          <p>Thanks for signing up. We're building the future of AI agent infrastructure.</p>
          <p>Get started: <a href="https://oma-ai.com/dashboard">Dashboard</a></p>
        `,
      })
      
      return Response.json({ success: true, message: 'Welcome email sent' })
    }
    
    if (type === 'waitlist') {
      // Waitlist signup
      console.log('Waitlist signup:', { email, timestamp: new Date().toISOString() })
      
      await resend.emails.send({
        from: 'OMA-AI <waitlist@oma-ai.com>',
        to: email,
        subject: "You're on the OMA-AI waitlist",
        html: `
          <h2>You're on the list!</h2>
          <p>We'll notify you when new features are ready.</p>
          <p>- OMA-AI Team</p>
        `,
      })
      
      return Response.json({ success: true, message: 'Added to waitlist' })
    }
    
    return Response.json({ error: 'Invalid type' }, { status: 400 })
    
  } catch (error) {
    console.error('Email error:', error)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
