// Point d'entrée du Worker : l'application Next.js (OpenNext) + la tâche planifiée
// qui remplace le cron Vercel (voir "triggers" dans wrangler.jsonc).
import handler from "./.open-next/worker.js";

export default {
  fetch: handler.fetch,

  async scheduled(controller, env, ctx) {
    const reponse = await handler.fetch(
      new Request("https://www.licences-app.fr/api/keepalive"),
      env,
      ctx,
    );
    if (!reponse.ok) {
      throw new Error("keepalive en échec : " + reponse.status + " " + (await reponse.text()));
    }
  },
};
