import { createAuthEndpoint, BetterAuthPlugin } from "better-auth/plugins";
import { sessionMiddleware } from "better-auth/api";
 
const myPlugin = ()=>{
    return {
        id: "my-plugin",
        endpoints: {
            getHelloWorld: createAuthEndpoint("/my-plugin/hello-world", {
                method: "GET",
                use: [sessionMiddleware], 
            }, async(ctx) => {
                const session = ctx.context.session;
                return ctx.json({
                    message: "Hello World"
                })
            })
        }
    } satisfies BetterAuthPlugin
}