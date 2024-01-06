import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc'
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import {prisma} from "db"

const producerFullDetails = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

const serviceDetails = z.object({
    name: z.string(),
    cost: z.number(),
    location: z.string(),
    producerId: z.number(),
})

export const producerRouter = createTRPCRouter({
    register : publicProcedure
        .input(producerFullDetails)
        .mutation(async ({input})=>{
            const existingUser = await prisma.producer.findFirst({
                where:{
                    email: input.email
                }
            })
            if(existingUser!=null) return new TRPCError({message:"User already exists" , code:"CONFLICT"})
            const createdUser = await prisma.producer.create({
                data:{
                    name : input.name,
                    email: input.email,
                    password: input.password,
                    services:{create:[]},                    
                },
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
            const existingUser = await prisma.producer.findFirst({
                where:{
                    email: input.email
                }
            })
            if(existingUser==null) return new TRPCError({message:"User doesnt exist" , code:"FORBIDDEN"})
            // direct to home page
            return {
                message: "Logged in successfully",
            }
        }),

    addService: protectedProcedure
        .input(serviceDetails)
        .mutation(async ({input})=>{
            const service = await prisma.service.create({
                data :{
                    name: input.name,
                    cost: input.cost,
                    location: input.location,
                    producerId: input.producerId
                }
            })
            if(service == null) return new TRPCError({message:"Service cannot be created" , code:"FORBIDDEN"})
        }),

    updateService: protectedProcedure
        .input(z.object({
            id:z.number(),
            name:z.string().optional(),
            cost:z.number().optional(),
            location:z.string().optional(),            
        }))
        .mutation(async ({input})=>{
            await prisma.service.update({
                where:{
                    id:input.id,
                },
                data:{
                    name:input.name,
                    cost:input.cost,
                    location:input.location
                }
            })
        }),

    deleteService: protectedProcedure
        .input(z.object({
            id:z.number(),
        }))
        .mutation(async ({input})=>{
            await prisma.service.delete({
                where:{
                    id:input.id,
                }
            })
        }),
        
    listServices: protectedProcedure
        .input(z.object({
            producerId : z.number()
        }))
        .query(async ({input})=>{
            const services = await prisma.service.findMany({
                where:{
                    producerId:input.producerId
                }
            })
            return {
                services: services
            }
        })
})