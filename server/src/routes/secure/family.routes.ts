import { Request, Response, Router } from "express"
import { PrismaClient } from '@prisma/client'
import { distanceInRadius } from "../../utils/distanceInRadius"

const prisma = new PrismaClient()
const router = Router()

router.get('/', async (req: Request, res: Response ) => {
  const radius = req.query.radius as string
  const coordinates = req.body.coordinates
  const state = req.body.state as string

  if (!coordinates) {
    return res.status(400).json({
      message: 'Missing required fields',
    })
  }

  

  const addresses = await prisma.address.findMany({
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
    },
    where: {
      state: state,
    }
  })

  const addressesInRadius = addresses.filter(address => {
    const addressCoordinates = address.coordinates?.split(',').map(coordinate => Number(coordinate))
    return distanceInRadius(coordinates[0], coordinates[1], addressCoordinates[0], addressCoordinates[1], Number(radius))
  })

  return res.status(200).json(addressesInRadius)
})

export default router
