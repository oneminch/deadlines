const useFile = () => {
  const toast = useToast()
  const { deadlines, populateDeadlineItems } = useDeadlines()

  const validateFileContent = (data: any) => {
    try {
      if (!data.trim()) {
        throw new Error('File is Empty. Nothing to Import.')
      }

      const parsedJSON = JSON.parse(data.trim(), (key, value) => {
        if (key === 'date') {
          return new Date(value)
        }
        return value
      })

      let validatedJSON = []
      if (Array.isArray(parsedJSON)) {
        if (parsedJSON.length === 0) {
          throw new Error('File is Empty. Nothing to Import.')
        }

        validatedJSON = parsedJSON.filter(
          (item) => deadlineItemSchema.validate(item).error === undefined,
        )
      }

      if (!validatedJSON || validatedJSON.length <= 0) {
        throw new Error('Unable to Import. File Contents are Invalid.')
      }

      return validatedJSON
    } catch (error: any) {
      let errorMessage = error.message

      if (error instanceof SyntaxError) {
        errorMessage = 'Unable to Import. File Contents are Invalid.'
      }

      toast.error(errorMessage, true)
      return
    }
  }

  const importData = (e: Event) => {
    const target = e.target as HTMLInputElement
    let file = null

    if (target.files) {
      file = target.files[0]
    }

    if (!file) {
      return
    }

    const extension = file.name.split('.').pop()!.toLowerCase(),
      mediaType = file.type.toLowerCase()

    if (extension.match('json') && mediaType.localeCompare('application/json') === 0) {
      const reader = new FileReader()
      reader.onload = async function (e: ProgressEvent<FileReader>) {
        const contents = e.target?.result as string
        const validatedContents = validateFileContent(contents)

        if (validatedContents) {
          await populateDeadlineItems(validatedContents)
          toast.success(`Imported ${validatedContents.length} Deadline(s) Successfully.`)
        } else {
          return
        }
      }

      reader.readAsText(file)
    } else {
      toast.error('Unable to Import. File Type is Invalid.', true)
    }
  }

  const exportData = () => {
    if (deadlines.value.length === 0) {
      toast.error('There is Nothing to Export.', true)
      return
    }

    const dataStr = JSON.stringify(deadlines.value)
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

    const exportFileName = 'deadlines.json'

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileName)
    linkElement.click()
    toast.success('Data Exported Successfully.', true)
  }

  return { exportData, importData }
}

export default useFile
