import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

// Configuration SMTP
const smtpConfig = {
  hostname: Deno.env.get("SMTP_HOST")!,
  port: parseInt(Deno.env.get("SMTP_PORT") || "465"),
  username: Deno.env.get("SMTP_USERNAME")!,
  password: Deno.env.get("SMTP_PASSWORD")!,
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const contactData: ContactRequest = await req.json();

    // Créer une connexion SMTP
    const client = new SmtpClient();
    
    await client.connectTLS(smtpConfig);
    
    // Envoyer l'email de contact
    await client.send({
      from: `${Deno.env.get("SMTP_FROM_NAME")} <${Deno.env.get("SMTP_FROM_EMAIL")}>`,
      to: Deno.env.get("SMTP_TO_EMAIL")!,
      subject: `${contactData.subject || 'Nouveau message de contact'} - ${contactData.name}`,
      content: `
        <h1>Nouveau message de contact reçu</h1>
        <h2>Informations du contact</h2>
        <ul>
          <li><strong>Nom:</strong> ${contactData.name}</li>
          <li><strong>Email:</strong> ${contactData.email}</li>
          ${contactData.phone ? `<li><strong>Téléphone:</strong> ${contactData.phone}</li>` : ''}
        </ul>
        
        <h2>Message</h2>
        <p>${contactData.message.replace(/\n/g, '<br>')}</p>
        
        <hr>
        <p><em>Ce message a été envoyé depuis votre site web.</em></p>
      `,
      "content-type": "text/html; charset=utf-8",
    });

    await client.close();

    console.log("Contact email sent successfully via SMTP");

    return new Response(JSON.stringify({ success: true, message: "Votre message a été envoyé avec succès" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        message: "Erreur lors de l'envoi du message, merci de réessayer" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);