import { prisma } from "~~/prisma/db"

type TagsPostBody = {
  tag: string
}

export default eventHandler(async (event) => {

  const {
    tag,
  } = await readBody<TagsPostBody>(event)

  const tag_exists = await prisma.tags.findFirst({
    where: {
      tag: tag
    }
  })

  if (tag_exists) {
    return {
      id: tag_exists.id
    }
  }

  const tag_created = await prisma.tags.create({
    data: {
      tag,
    },
  })

  return {
    id: tag_created.id
  }
})