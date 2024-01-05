import { createTRPCRouter, publicProcedure } from '../trpc'
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

export const consumerRouter = createTRPCRouter({
    register : publicProcedure
        .input(
            z.object({
                name: z.string(),
                email: z.string().email(),
                password: z.string(),
            }),
        )
        .query(async ({input,ctx})=>{
            const existingUser = await ctx.prisma.consumer.findFirst({
                where:{
                    email: input.email
                }
            })
            if(existingUser!=null) return new TRPCError({message:"User already exists" , code:"CONFLICT"})
            const createdUser = await ctx.prisma.consumer.create({
                data:{
                    name : input.name,
                    email: input.email,
                    password: input.password
                }
            })
            if(createdUser == null) return new TRPCError({message:"User not created",code:"FORBIDDEN"})
        }),

    login : publicProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string(),
            }),
        )
        .query(async ({input,ctx})=>{
            const existingUser = await ctx.prisma.consumer.findFirst({
                where:{
                    email: input.email
                }
            })
            if(existingUser==null) return new TRPCError({message:"User doesnt exist" , code:"FORBIDDEN"})
            // direct to home page
        })
})