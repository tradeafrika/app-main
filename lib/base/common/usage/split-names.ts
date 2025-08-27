interface NameParts {
    firstName: string
    lastName: string
}

export function splitFullName(fullName: string): NameParts {
    // Trim whitespace and handle empty/null input
    const trimmedName = fullName?.trim() || ''

    if (!trimmedName) {
        return { firstName: '', lastName: '' }
    }

    // Split by spaces and filter out empty strings
    const nameParts = trimmedName.split(/\s+/).filter((part) => part.length > 0)

    if (nameParts.length === 0) {
        return { firstName: '', lastName: '' }
    } else if (nameParts.length === 1) {
        return { firstName: nameParts[0], lastName: '' }
    } else {
        // First part is firstName, everything else combined is lastName
        const firstName = nameParts[0]
        const lastName = nameParts.slice(1).join(' ')
        return { firstName, lastName }
    }
}
