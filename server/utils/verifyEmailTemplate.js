const verifyEmailTemplate = ({ name, url }) => {
  return `
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vérification de votre adresse email</title>
</head>

<body style="margin:0;padding:0;background:#f5f7fa;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

<table width="100%" cellspacing="0" cellpadding="0" style="padding:40px 20px;background:#f5f7fa;">
<tr>
<td align="center">

<table width="600" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">

<!-- Header -->
<tr>
<td style="padding:35px 40px;border-bottom:1px solid #e5e7eb;">
    <h1 style="margin:0;font-size:24px;font-weight:700;color:#111827;">
        Vérifiez votre adresse email
    </h1>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:40px;">

<p style="margin:0 0 20px;font-size:16px;color:#111827;">
    Bonjour <strong>${name}</strong>,
</p>

<p style="margin:0 0 18px;font-size:16px;line-height:1.7;color:#4b5563;">
    Merci de vous être inscrit sur notre plateforme.
</p>

<p style="margin:0 0 30px;font-size:16px;line-height:1.7;color:#4b5563;">
    Afin d'activer votre compte, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous.
</p>

<table cellspacing="0" cellpadding="0" align="center">
<tr>
<td align="center" bgcolor="#1d4ed8" style="border-radius:8px;">
<a href="${url}"
style="
display:inline-block;
padding:14px 32px;
font-size:16px;
font-weight:600;
color:#ffffff;
text-decoration:none;
">
Confirmer mon adresse email
</a>
</td>
</tr>
</table>

<p style="margin:35px 0 10px;font-size:15px;color:#6b7280;">
Si le bouton ci-dessus ne fonctionne pas, copiez et collez le lien suivant dans votre navigateur :
</p>

<p style="margin:0;">
<a href="${url}"
style="color:#1d4ed8;text-decoration:none;word-break:break-word;font-size:14px;">
${url}
</a>
</p>

<p style="margin-top:35px;font-size:15px;line-height:1.7;color:#6b7280;">
Si vous n'avez pas créé de compte, vous pouvez ignorer cet email en toute sécurité.
</p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:25px 40px;background:#f9fafb;border-top:1px solid #e5e7eb;">

<p style="margin:0;font-size:13px;color:#9ca3af;text-align:center;">
© ${new Date().getFullYear()} Votre Entreprise. Tous droits réservés.
</p>

<p style="margin:8px 0 0;font-size:13px;color:#9ca3af;text-align:center;">
Cet email a été envoyé automatiquement. Merci de ne pas y répondre.
</p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`;
};

export default verifyEmailTemplate;
