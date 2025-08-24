import { WebhookClient } from 'discord.js';

const webhookClient = new WebhookClient({ url: process.env.WEBHOOK_URL });

export const sendWebhook = async (client, ip) => {
    try {
        await webhookClient.send({
            content: `<@745688196440129915> Someone summoned you!\nclient: \`${client}\`\nip: \`${ip}\``,
        });
        console.log('Webhook sent successfully');
    } catch (error) {
        console.error('Error sending webhook:', error);
    }
}