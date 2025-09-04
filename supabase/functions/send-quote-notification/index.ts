import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";

// Configuration SMTP
const smtpConfig = {
  hostname: Deno.env.get("SMTP_HOST")?.trim() || "",
  port: parseInt(Deno.env.get("SMTP_PORT") || "465"),
  username: Deno.env.get("SMTP_USERNAME")?.trim() || "",
  password: Deno.env.get("SMTP_PASSWORD") || "",
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface QuoteNotificationRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budgetRange: string;
  description: string;
  timeline: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const quoteData: QuoteNotificationRequest = await req.json();

    // Créer une connexion SMTP
    const client = new SmtpClient();
    
    await client.connectTLS(smtpConfig);
    
    // Envoyer l'email de notification à Tchjima
    await client.send({
      from: `${Deno.env.get("SMTP_FROM_NAME")} <${Deno.env.get("SMTP_FROM_EMAIL")}>`,
      to: Deno.env.get("SMTP_TO_EMAIL")!,
      subject: `Nouvelle demande de devis - ${quoteData.name}`,
      content: `
        <h1>Nouvelle demande de devis reçue</h1>
        <h2>Informations du client</h2>
        <ul>
          <li><strong>Nom:</strong> ${quoteData.name}</li>
          <li><strong>Email:</strong> ${quoteData.email}</li>
          <li><strong>Téléphone:</strong> ${quoteData.phone}</li>
          <li><strong>Entreprise:</strong> ${quoteData.company}</li>
        </ul>
        
        <h2>Détails du projet</h2>
        <ul>
          <li><strong>Type de projet:</strong> ${quoteData.projectType}</li>
          <li><strong>Budget estimé:</strong> ${quoteData.budgetRange}</li>
          <li><strong>Délai souhaité:</strong> ${quoteData.timeline}</li>
        </ul>
        
        <h2>Description</h2>
        <p>${quoteData.description}</p>
        
        <hr>
        <p><em>Cette demande a été envoyée depuis votre site web.</em></p>
      `,
      "content-type": "text/html; charset=utf-8",
    });

    await client.close();

    console.log("Email sent successfully via SMTP");

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-quote-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);