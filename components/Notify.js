import { createStandaloneToast } from '@chakra-ui/react'

export function ErrorToast(title, description, duration) {
  const toast = createStandaloneToast()
  toast({
          title: title,
          description: description,
          status: 'error',
          duration: {!duration ? 5000 : duration},
          isClosable: true,
        })
}
