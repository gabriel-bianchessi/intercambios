import { Router } from "express"
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = Router()

router.post('/', async (req, res) => {
  const userId = req.currentUser.id

  const {
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
    country,
    postalCode,
    coordinates,
  } = req.body

  if (!street || !number || !neighborhood || !city || !state || !country || !postalCode) {
    return res.status(400).json({
      message: 'Missing required fields',
    })
  }

  const commaSeparatedCoordinates = coordinates?.join(',')

  const createdAddress = await prisma.address.create({
    data: {
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      country,
      postalCode,
      coordinates: commaSeparatedCoordinates,
      user: {
        connect: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      street: true,
      number: true,
      complement: true,
      neighborhood: true,
      city: true,
      state: true,
      country: true,
      postalCode: true,
      coordinates: true,
    }
  })

  return res.status(201).json(createdAddress)
})

export default router