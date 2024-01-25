import { TRPCError } from "@trpc/server";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import * as z from 'zod'

const ServiceTypes = z.enum([
    'MARRIAGEHALL',
    'PHOTOGRAPHER',
    'DJ',
    'CATERER',
])

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
        }),

    displayServices: protectedProcedure
        .input(z.object({
            name: z.string().optional(),
            type: ServiceTypes.optional(),
            cost : z.number().optional(),
        }))
        .mutation(async(opts)=>{
            const services = await opts.ctx.prisma.service.findMany({
                where:{
                    name: opts.input.name,
                    type: opts.input.type,
                    cost: opts.input.cost
                }
            })
            if(!services) return new TRPCError({"message":"No services found","code":"NOT_FOUND"})
            return services
        }),

    listMyServices: protectedProcedure
        .mutation(async(opts)=>{
            const services = await opts.ctx.prisma.client.findFirst({
                where:{
                    id: opts.ctx.auth.userId!
                },
                select:{
                    services:true
                }
            })
            if(!services) return new TRPCError({"message":"No services found","code":"NOT_FOUND"})
            return services.services
        }),

    bidAccept : protectedProcedure
        .input(z.object({
            serviceId: z.string(),
            producerId: z.string(),
        }))
        .mutation(async(opts)=>{

            const serviceUpdatedWithUser = await opts.ctx.prisma.service.update({
                where:{
                    id:opts.input.serviceId
                },
                data:{
                    client:{
                        connect:{
                            id: opts.ctx.auth.userId!
                        }
                    }
                }
            })
            if(!serviceUpdatedWithUser) return new TRPCError({"message":"Internal Server Error","code":"INTERNAL_SERVER_ERROR"})

            const updatedProducerWithClient = await opts.ctx.prisma.producer.update({
                where:{
                    id:opts.input.producerId
                },
                data:{
                    clients:{
                        connect:{
                            id: opts.ctx.auth.userId!
                        }
                    }
                }
            })
            if(!updatedProducerWithClient) return new TRPCError({"message":"Internal Server Error","code":"INTERNAL_SERVER_ERROR"})
            
            const updatedClientWithProducer = await opts.ctx.prisma.client.update({
                where:{
                    id:opts.ctx.auth.userId!
                },
                data:{
                    producers:{
                        connect:{
                            id: opts.input.producerId
                        }
                    }
                }
            })
            if(!updatedClientWithProducer) return new TRPCError({"message":"Internal Server Error","code":"INTERNAL_SERVER_ERROR"})
        })
})