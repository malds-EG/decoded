import { sendMail, ADMIN_EMAILS } from "./transporter";

export async function sendSessionSubmissionEmail({
  subject,
  html,
}: {
  subject: string;
  html: string;
}) {
  return sendMail({ to: ADMIN_EMAILS, subject, html });
}

export async function sendConfirmationEmail({
  to,
  name,
}: {
  to: string;
  name: string;
}) {
  const safeName = name.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Decoded – Proposal Received</title>
  <style>
    /* ── Fonts ── */
    @font-face {
      font-family: 'Clash Display';
      src: url('${base}/fonts/ClashDisplay-Semibold.woff2') format('woff2');
      font-weight: 600;
      font-style: normal;
    }
    @font-face {
      font-family: 'Aileron';
      src: url('${base}/fonts/Aileron-600.woff2') format('woff2');
      font-weight: 600;
      font-style: normal;
    }
    @font-face {
      font-family: 'Aileron';
      src: url('${base}/fonts/Aileron-700.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
    }

    /* ── Reset ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: #1e1e1e;
      -webkit-font-smoothing: antialiased;
      font-family: 'Aileron', sans-serif;
      padding: 40px 16px;
    }

    /* ── Outer wrapper ── */
    .wrapper {
      max-width: 640px;
      margin: 0 auto;
      background: #1e1e1e;
    }

    /* ──────────────────────────────
       HEADER
    ────────────────────────────── */
    .header {
      background: #e81a2d;
      padding: 16px 24px 0;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      overflow: visible;
      position: relative;
    }

    .header-logos {
      display: flex;
      align-items: center;
      gap: 14px;
      padding-bottom: 16px;
    }

    .header-logos img {
      display: block;
      filter: brightness(0) invert(1);
    }

    /* ──────────────────────────────
       GREETING
    ────────────────────────────── */
    .section-greeting {
      padding: 40px 48px 0;
    }

    .greeting-heading {
      font-family: 'Clash Display', sans-serif;
      font-size: 22px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      color: #f0ede6;
      line-height: 1.25;
      margin-bottom: 16px;
    }

    .greeting-heading span {
      color: #e81a2d;
    }

    .greeting-body {
      font-family: 'Aileron', sans-serif;
      font-size: 15px;
      line-height: 1.7;
      color: #9aa0ac;
    }

    /* ──────────────────────────────
       DIVIDER
    ────────────────────────────── */
    .divider {
      margin: 28px 48px 0;
      height: 1px;
      background: #6d7585;
    }

    /* ──────────────────────────────
       WHAT HAPPENS NEXT
    ────────────────────────────── */
    .section-steps {
      padding: 32px 48px 0;
    }

    .steps-eyebrow {
      font-family: 'Clash Display', sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #6d7585;
      margin-bottom: 20px;
    }

    .steps-table {
      width: 100%;
      border-collapse: collapse;
    }

    .steps-table td {
      vertical-align: top;
      padding-bottom: 16px;
    }

    .steps-table tr:last-child td {
      padding-bottom: 0;
    }

    .step-label {
      font-family: 'Aileron', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #f0ede6;
      white-space: nowrap;
      padding-right: 20px;
      width: 130px;
    }

    .step-value {
      font-family: 'Aileron', sans-serif;
      font-size: 14px;
      line-height: 1.65;
      color: #9aa0ac;
    }

    /* ──────────────────────────────
       CTA BANNER
    ────────────────────────────── */
    .section-cta {
      padding: 24px 48px;
    }

    .cta-inner {
      background: rgb(72, 18, 18);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .cta-text {
      padding: 14px 12px 14px 16px;
    }

    .cta-text-title {
      font-family: 'Aileron', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #f0ede6;
      margin-bottom: 3px;
    }

    .cta-text-sub {
      font-family: 'Aileron', sans-serif;
      font-size: 12px;
      color: #9aa0ac;
    }

    .cta-text-sub a {
      color: #e81a2d;
      text-decoration: none;
    }

    .cta-btn-wrap {
      padding: 14px 16px 14px 12px;
      flex-shrink: 0;
    }

    .cta-btn {
      display: inline-block;
      background: rgb(152, 42, 42);
      padding: 10px 18px;
      font-family: 'Clash Display', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #f0ede6;
      text-decoration: none;
      white-space: nowrap;
    }

    /* ──────────────────────────────
       FOOTER
    ────────────────────────────── */
    .footer {
      background: #000;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .footer-logo img {
      display: block;
      filter: brightness(0) invert(1) opacity(0.45);
    }

    .footer-copy {
      font-family: 'Aileron', sans-serif;
      font-size: 11px;
      color: #6d7585;
      white-space: nowrap;
    }

    /* ──────────────────────────────
       RESPONSIVE – mobile
    ────────────────────────────── */
    @media (max-width: 600px) {
      body { padding: 0; }

      .section-greeting,
      .section-steps { padding-left: 24px; padding-right: 24px; }

      .divider { margin-left: 24px; margin-right: 24px; }

      .section-cta { padding: 24px; }

      .cta-inner { flex-direction: column; align-items: flex-start; }

      .cta-btn-wrap {
        padding: 0 16px 14px;
        width: 100%;
        box-sizing: border-box;
      }

      .cta-btn { display: block; text-align: center; width: 100%; box-sizing: border-box; }

      .steps-table,
      .steps-table tbody,
      .steps-table tr,
      .steps-table td { display: block; width: 100%; }

      .steps-eyebrow { 
        font-size: 18px; 
      }

      .step-label {
        white-space: normal;
        padding-right: 0;
        padding-bottom: 2px;
        width: 100%;
      }

      .step-value { padding-bottom: 14px; }

      .footer { flex-direction: column; align-items: flex-start; gap: 8px; }
      .footer-copy { text-align: left; }
    }
  </style>
</head>
<body>

<div class="wrapper">

  <!-- ── Red Header ── -->
  <div class="header">
    <div class="header-logos">
      <!-- Replace src with your actual asset paths -->
      <img src="${base}/Decoded Logo V4 1.png" alt="Decoded" width="80" height="12">
      <img src="${base}/EG Logo V2 1.png" alt="EG" height="20">
    </div>
    <!-- Decorative icon: replace with your actual asset or keep this SVG chevron -->
      </div>

  <!-- ── Greeting ── -->
  <div class="section-greeting">
    <h1 class="greeting-heading">
      WE GOT YOUR PROPOSAL,<br>
      <span>${safeName}</span>
    </h1>
    <p class="greeting-body">
      Thank you for your submitting you proposal to Decoded. Our team will review your proposal carefully and will be in touch within 5 working days.
    </p>
  </div>

  <!-- ── Divider ── -->
  <div class="divider"></div>

  <!-- ── What Happens Next ── -->
  <div class="section-steps">
    <p class="steps-eyebrow">WHAT HAPPENS NEXT</p>
    <table class="steps-table" role="presentation">
      <tbody>
        <tr>
          <td class="step-label">1. Review:</td>
          <td class="step-value">Your proposal lands with the Decoded programme team for a first read.</td>
        </tr>
        <tr>
          <td class="step-label">2. Discovery call:</td>
          <td class="step-value">If it's a fit, we'll reach out to schedule a 30-minute conversation about your session.</td>
        </tr>
        <tr>
          <td class="step-label">3. Confirmed:</td>
          <td class="step-value">Format, date, and logistics locked. We handle everything from here.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- ── Divider ── -->
  <div class="divider" style="margin-top: 24px;"></div>

  <!-- ── CTA Banner ── -->
  <div class="section-cta">
    <div class="cta-inner">
      <div class="cta-text">
        <p class="cta-text-title">Questions in the meantime?</p>
        <p class="cta-text-sub">Reach the Decoded team at <a href="mailto:gcx@eg.dk">gcx@eg.dk</a></p>
      </div>
      <div class="cta-btn-wrap">
        <a href="mailto:gcx@eg.dk" class="cta-btn">GET IN TOUCH</a>
      </div>
    </div>
  </div>

  <!-- ── Footer ── -->
  <div class="footer">
    <div class="footer-logo">
      <img src="${base}/Decoded Logo V4 1.png" alt="Decoded-footer" width="80" height="12">
    </div>
    <span class="footer-copy">© 2026 EG. All rights reserved</span>
  </div>

</div>

</body>
</html>
`
;

  return sendMail({
    to,
    subject: "We received your proposal — Decoded",
    html,
  });
}
