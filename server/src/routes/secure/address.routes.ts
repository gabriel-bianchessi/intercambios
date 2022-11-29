import { Request, Response, Router } from "express"
import { PrismaClient } from '@prisma/client'
import { distanceInRadius } from "../../utils/distanceInRadius"

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

router.get('/', async (req: Request, res: Response) => {
  const userId = req.currentUser.id

  const { latitude, longitude } = req.body
  
  if (!latitude || !longitude) {
    return res.status(400).json({
      message: 'Missing required fields',
    })
  }

  const address = await prisma.address.findFirst({
    where: {
      user: {
        id: userId,
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

  return res.json(address)
})

export default router