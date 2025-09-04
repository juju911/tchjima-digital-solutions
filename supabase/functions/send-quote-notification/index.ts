import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

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

    // Send email notification to Tchjima
    const emailResponse = await resend.emails.send({
      from: "Devis Website <onboarding@resend.dev>",
      to: ["kktjunior911@gmail.com"],
      subject: `Nouvelle demande de devis - ${quoteData.name}`,
      html: `
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
    });

    console.log("Email sent successfully:", emailResponse);

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