import { TRPCError } from "@trpc/server";
import { publicProcedure, protectedProcedure,router } from "../trpc";
import * as z from 'zod'

const ServiceTypes = z.enum([
    'MARRIAGEHALL',
    'PHOTOGRAPHER',
    'DJ',
    'CATERER',
])

export const producerRouter = router({
    login: publicProcedure
        .input(z.object({   
            name:z.string(),
            email:z.string().email(),
            password:z.string(),
            phone_number:z.number().gte(10)
        }))
        .mutation(async(opts)=>{
            const newClient = await opts.ctx.prisma.producer.create({
                data:{
                    name:opts.input.name,
                    email:opts.input.email,
                    password:opts.input.password,
                    phone_number:opts.input.phone_number
                }
            })
            if(!newClient) return new TRPCError({"message":"Internal Server Error while creating producer",code:"INTERNAL_SERVER_ERROR"})
        }),

    signup: publicProcedure
        .input(z.object({   
            email:z.string().email(),
            password:z.string(),
        }))
        .mutation(async(opts)=>{
            const newProducer = await opts.ctx.prisma.producer.findFirst({
                where:{
                    email:opts.input.email,
                }
            })
            if(!newProducer) return new TRPCError({"message":"Client not found",code:"UNAUTHORIZED"})
            if(newProducer.password !== opts.input.password) return new TRPCError({"message":"Invalid password",code:"UNAUTHORIZED"})
        }),

    createService : protectedProcedure
        .input(z.object({
            name: z.string(),
            type: ServiceTypes,
            cost : z.number(),
            details: z.string(),
        }))
        .mutation(async(opts)=>{
            const newService = await opts.ctx.prisma.service.create({
                data:{
                    name:opts.input.name,
                    type:opts.input.type,
                    cost:opts.input.cost,
                    details:opts.input.details,
                    producer:{
                        connect:{
                            id:opts.ctx.auth.userId!
                        }
                    }                 
                }
            })
            if(!newService) return new TRPCError({"message":"Internal Server Error while creating service",code:"INTERNAL_SERVER_ERROR"})
            // return service created
        }),

    readService : protectedProcedure
        .input(z.object({
            id:z.string()
        }))
        .mutation(async(opts)=>{
            const service = await opts.ctx.prisma.producer.findFirst({
                where:{
                    id:opts.ctx.auth.userId!
                },
                select:{
                    services:true
                }
            })
            if(!service) return new TRPCError({"message":"Service not found",code:"NOT_FOUND"})
        }),

    updateService : protectedProcedure
        .input(z.object({
            name: z.string().optional(),
            cost : z.number().optional(),
            details: z.string().optional(),
            id: z.string()
        }))
        .mutation(async(opts)=>{
            const updatedService = await opts.ctx.prisma.service.update({
                where:{
                    id:opts.input.id
                },
                data:{
                    name:opts.input.name!,
                    cost:opts.input.cost!,
                    details:opts.input.details!,
                    producer:{
                        connect:{
                            id:opts.ctx.auth.userId!
                        }
                    } 
                }
            })
            if(!updatedService) return new TRPCError({"message":"Internal Server Error while updating service",code:"INTERNAL_SERVER_ERROR"})

        }),

    deleteService : protectedProcedure
        .input(z.object({
            id:z.string()
        }))
        .mutation(async(opts)=>{
            const service = await opts.ctx.prisma.service.delete({
                where:{
                    id:opts.input.id
                }
            })
            if(!service) return new TRPCError({"message":"Service not found",code:"NOT_FOUND"})
        }),

    listServices : protectedProcedure
        .mutation(async(opts)=>{
            const services = await opts.ctx.prisma.producer.findMany({
                where:{
                    id:opts.ctx.auth.userId!
                },
                select:{
                    services:true
                }
            })
            if(!services) return new TRPCError({"message":"No services found",code:"NOT_FOUND"})
            return services
        }),

    listClients : protectedProcedure
        .mutation(async(opts)=>{
            const clients = await opts.ctx.prisma.producer.findMany({
                where:{
                    id:opts.ctx.auth.userId!
                },
                select:{
                    clients:true
                }
            })
            if(!clients) return new TRPCError({"message":"No clients found",code:"NOT_FOUND"})
            return clients
        }),
})