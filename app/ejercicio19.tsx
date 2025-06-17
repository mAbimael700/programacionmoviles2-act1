import React from 'react'
import { View } from 'react-native'
import EjercicioTemplate from '~/components/activity/ejercicio-template'
import { Text } from '~/components/ui/text'
import { patterns } from '~/lib/actividad19/actividad19'

export default function ejercicio19() {
    const [inputText, setInputText] = React.useState<string>('')
    const [result, setResult] = React.useState<string[]>([])

    const onInputChange = () => {
        if (inputText) {
            const letters = inputText.toUpperCase().split('').filter(char => /[A-Z]/.test(char))
            const printedLetters = letters.map(letter => createPrintLetter(letter))
            setResult(printedLetters)
        } else {
            setResult([])
        }
    }

    React.useEffect(() => {
        onInputChange()
    }, [inputText])

    return (
        <EjercicioTemplate
            description='Cree un programa que imprima sus iniciales en mayúsculas de imprenta, de manera que apunten hacia la parte inferior de la página (acostadas)'
            placeholder='Escribe tus iniciales (ej: AJ)'
            inputState={{ set: setInputText, value: inputText }}
        >
            <View>
                <Text className='font-semibold'>Iniciales impresas:</Text>
                <View style={{ marginTop: 10 }}>
                    {result.map((letterArt, index) => (
                        <View key={index} style={{ marginBottom: 20 }} className='rotate-90 '>
                            <Text style={{
                                fontFamily: 'monospace',
                                fontSize: 12,
                                lineHeight: 14,
                                letterSpacing: 1
                            }}>
                                {letterArt}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
        </EjercicioTemplate>
    )
}

function createPrintLetter(letter: string): string {
    return patterns[letter]?.join('\n') || `Letra '${letter}' no disponible`
}