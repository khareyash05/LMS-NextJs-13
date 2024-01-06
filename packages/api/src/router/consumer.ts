import { createTRPCRouter, publicProcedure } from '../trpc'
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {prisma} from "db"

const consumerFullDetails = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

export const consumerRouter = createTRPCRouter({
    register : publicProcedure
        .input(consumerFullDetails)
        .mutation(async ({input})=>{
            const existingUser = await prisma.consumer.findFirst({
                where:{
                    email: input.email
                }
            })
            if(existingUser!=null) return new TRPCError({message:"User already exists" , code:"CONFLICT"})
            const createdUser = await prisma.consumer.create({
                data:{
                    name : input.name,
                    email: input.email,
                    password: input.password
                }
            })
            if(createdUser == null) return new TRPCError({message:"User not created",code:"FORBIDDEN"})
            return {
                id: createdUser.id,
                message: "User created"
            }
        }),

    login : publicProcedure
        .input(
            z.object({
                email: z.string().email(),
                password: z.string(),
            }),
        )
        .mutation(async ({input})=>{
            const existingUser = await prisma.consumer.findFirst({
                where:{
                    email: input.email
                }
            })
            if(existingUser==null) return new TRPCError({message:"User doesnt exist" , code:"FORBIDDEN"})
            return {
                message: "Logged in successfully"
            }
        })
})