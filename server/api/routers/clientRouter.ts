import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";
import * as z from 'zod'

export const clientRouter = router({
    login: publicProcedure
        .input(z.object({   
            name:z.string(),
            email:z.string().email(),
            password:z.string(),
            phone_number:z.number().gte(10)
        }))
        .mutation(async(opts)=>{
            const newClient = await opts.ctx.prisma.client.create({
                data:{
                    name:opts.input.name,
                    email:opts.input.email,
                    password:opts.input.password,
                    phone_number:opts.input.phone_number
                }
            })
            if(!newClient) return new TRPCError({"message":"Internal Server Error while creating client",code:"INTERNAL_SERVER_ERROR"})
        }),
    signup: publicProcedure
        .input(z.object({   
            email:z.string().email(),
            password:z.string(),
        }))
        .mutation(async(opts)=>{
            const newClient = await opts.ctx.prisma.client.findFirst({
                where:{
                    email:opts.input.email,
                }
            })
            if(!newClient) return new TRPCError({"message":"Client not found",code:"UNAUTHORIZED"})
            if(newClient.password !== opts.input.password) return new TRPCError({"message":"Invalid password",code:"UNAUTHORIZED"})
            // redirect to dashboard
        })
})