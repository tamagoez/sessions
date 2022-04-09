import { createStandaloneToast } from '@chakra-ui/react'

export function ErrorToast(title, description, duration) {
  const toast = createStandaloneToast()
  const dur = (!duration ? 5000 : duration)
  toast({
          title: title,
          description: description,
          position: 'top-right',
          status: 'error',
          duration: dur,
          isClosable: true,
        })
}
