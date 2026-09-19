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

  const exportData = async () => {
    if (deadlines.value.length === 0) {
      toast.error('There is Nothing to Export.', true)
      return
    }

    const dataStr = JSON.stringify(deadlines.value)
    const exportFileName = 'deadlines.json'
    const file = new File([dataStr], exportFileName, { type: 'application/json' })

    // iOS Safari (including PWA/standalone mode) doesn't reliably support
    // downloading files via data URIs or the anchor `download` attribute, so
    // the Web Share API is used there instead when available.
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file] })
        toast.success('Data Exported Successfully.', true)
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          toast.error('Unable to Export Data.', true)
        }
      }
      return
    }

    const blobUrl = URL.createObjectURL(new Blob([dataStr], { type: 'application/json' }))

    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', blobUrl)
    linkElement.setAttribute('download', exportFileName)
    document.body.appendChild(linkElement)
    linkElement.click()
    document.body.removeChild(linkElement)
    URL.revokeObjectURL(blobUrl)

    toast.success('Data Exported Successfully.', true)
  }

  return { exportData, importData }
}

export default useFile
