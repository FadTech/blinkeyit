
const forgotPasswordTemplate = ({ name, otp }) => {
    return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Réinitialisation du mot de passe - Blinkeyit</title>
    </head>

    <body style="
        margin: 0;
        padding: 0;
        background-color: #f1f5f9;
        font-family: Arial, Helvetica, sans-serif;
        color: #1e293b;
    ">
        <div style="
            display: none;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
        ">
            Votre code de réinitialisation Blinkeyit est prêt.
        </div>

        <table role="presentation" width="100%" cellspacing="0"
            cellpadding="0" border="0" style="background-color: #f1f5f9;">
            <tr>
                <td align="center" style="padding: 40px 15px;">

                    <table role="presentation" width="100%" cellspacing="0"
                        cellpadding="0" border="0"
                        style="
                            max-width: 600px;
                            background-color: #ffffff;
                            border-radius: 16px;
                            overflow: hidden;
                            border: 1px solid #e2e8f0;
                        ">

                        <!-- En-tête -->
                        <tr>
                            <td align="center" style="
                                background-color: #2563eb;
                                padding: 32px 20px;
                            ">
                                <div style="
                                    display: inline-block;
                                    width: 58px;
                                    height: 58px;
                                    line-height: 58px;
                                    border-radius: 16px;
                                    background-color: #ffffff;
                                    color: #2563eb;
                                    font-size: 28px;
                                    font-weight: bold;
                                ">
                                    B
                                </div>

                                <h1 style="
                                    margin: 15px 0 6px;
                                    color: #ffffff;
                                    font-size: 28px;
                                    letter-spacing: 1px;
                                ">
                                    Blinkeyit
                                </h1>

                                <p style="
                                    margin: 0;
                                    color: #dbeafe;
                                    font-size: 14px;
                                ">
                                    Sécurité de votre compte
                                </p>
                            </td>
                        </tr>

                        <!-- Contenu -->
                        <tr>
                            <td style="padding: 35px 30px 20px;">

                                <h2 style="
                                    margin: 0 0 18px;
                                    color: #0f172a;
                                    font-size: 24px;
                                    line-height: 1.4;
                                ">
                                    Réinitialisation de votre mot de passe
                                </h2>

                                <p style="
                                    margin: 0 0 16px;
                                    font-size: 15px;
                                    line-height: 1.8;
                                    color: #334155;
                                ">
                                    Bonjour <strong>${name || "cher utilisateur"}</strong>,
                                </p>

                                <p style="
                                    margin: 0 0 22px;
                                    font-size: 15px;
                                    line-height: 1.8;
                                    color: #475569;
                                ">
                                    Vous avez demandé à réinitialiser le mot
                                    de passe de votre compte Blinkeyit.
                                    Utilisez le code de vérification ci-dessous
                                    pour poursuivre la procédure.
                                </p>

                                <!-- Code OTP -->
                                <div style="
                                    margin: 25px 0;
                                    padding: 25px 15px;
                                    text-align: center;
                                    background-color: #eff6ff;
                                    border: 1px dashed #93c5fd;
                                    border-radius: 12px;
                                ">
                                    <p style="
                                        margin: 0 0 12px;
                                        color: #64748b;
                                        font-size: 12px;
                                        font-weight: bold;
                                        letter-spacing: 2px;
                                        text-transform: uppercase;
                                    ">
                                        Votre code de vérification
                                    </p>

                                    <div style="
                                        color: #1d4ed8;
                                        font-size: 34px;
                                        font-weight: bold;
                                        letter-spacing: 8px;
                                        overflow-wrap: anywhere;
                                    ">
                                        ${otp}
                                    </div>

                                    <p style="
                                        margin: 14px 0 0;
                                        color: #64748b;
                                        font-size: 12px;
                                    ">
                                        Valable pendant 10 minutes
                                    </p>
                                </div>

                                <!-- Avertissement -->
                                <table role="presentation" width="100%"
                                    cellspacing="0" cellpadding="0" border="0">
                                    <tr>
                                        <td width="35" valign="top"
                                            style="padding: 4px 8px 0 0;">
                                            <span style="font-size: 20px;">
                                                🔒
                                            </span>
                                        </td>

                                        <td style="
                                            color: #475569;
                                            font-size: 13px;
                                            line-height: 1.8;
                                        ">
                                            <strong style="color: #0f172a;">
                                                Gardez ce code confidentiel.
                                            </strong>
                                            Ne le communiquez à personne,
                                            même à une personne prétendant
                                            représenter Blinkeyit.
                                        </td>
                                    </tr>
                                </table>

                                <p style="
                                    margin: 25px 0 0;
                                    color: #64748b;
                                    font-size: 13px;
                                    line-height: 1.8;
                                ">
                                    Si vous n'êtes pas à l'origine de cette
                                    demande, ignorez simplement cet e-mail.
                                    Votre mot de passe actuel reste inchangé
                                    tant que vous ne terminez pas la procédure
                                    de réinitialisation.
                                </p>

                            </td>
                        </tr>

                        <!-- Pied de page -->
                        <tr>
                            <td style="
                                padding: 24px 25px;
                                background-color: #f8fafc;
                                border-top: 1px solid #e2e8f0;
                                text-align: center;
                            ">
                                <p style="
                                    margin: 0 0 8px;
                                    color: #334155;
                                    font-size: 13px;
                                    font-weight: bold;
                                ">
                                    L'équipe Blinkeyit
                                </p>

                                <p style="
                                    margin: 0;
                                    color: #94a3b8;
                                    font-size: 12px;
                                    line-height: 1.7;
                                ">
                                    Cet e-mail a été envoyé automatiquement.
                                    Merci de ne pas y répondre.
                                </p>

                                <p style="
                                    margin: 14px 0 0;
                                    color: #cbd5e1;
                                    font-size: 11px;
                                ">
                                    © ${new Date().getFullYear()} Blinkeyit.
                                    Tous droits réservés.
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

export default forgotPasswordTemplate;
