import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, Easing } from 'react-native-reanimated'
import { View } from 'react-native'
import { Input } from '~/components/ui/input'
import { Text } from '~/components/ui/text'

export interface InputConfig {
    key: string
    placeholder: string
    label?: string
    value: any
    set: React.Dispatch<React.SetStateAction<any>>
}

interface EjercicioTemplateMultipleProps {
    description: string
    inputs: InputConfig[]
    children: React.ReactNode
}

export default function EjercicioTemplateMultiple({ 
    description, 
    inputs, 
    children 
}: EjercicioTemplateMultipleProps) {
    const opacity = useSharedValue(0)

    // Estilo animado
    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: opacity.value }],
        }
    })

    const checkAllInputsFilled = () => {
        return inputs.every(input => input.value && input.value.toString().trim() !== '')
    }

    const onChangeInput = (text: string, inputKey: string) => {
        // Encuentra el input correspondiente y actualiza su estado
        const input = inputs.find(inp => inp.key === inputKey)
        if (input) {
            input.set(text)
        }

        // Verifica si todos los inputs están llenos para mostrar/ocultar resultado
        // Usamos setTimeout para que el estado se actualice primero
        setTimeout(() => {
            if (checkAllInputsFilled()) {
                opacity.value = withTiming(1, {
                    duration: 300,
                    easing: Easing.out(Easing.ease),
                })
            } else {
                opacity.value = withTiming(0, {
                    duration: 300,
                    easing: Easing.in(Easing.ease),
                })
            }
        }, 10)
    }

    return (
        <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
            <View className='mb-4'>
                <Text className='text-center text-lg font-medium'>{description}</Text>
            </View>
            
            <View className='w-full max-w-md gap-4'>
                {inputs.map((input) => (
                    <View key={input.key} className='gap-2'>
                        {input.label && (
                            <Text className='text-sm font-medium text-foreground/80'>
                                {input.label}
                            </Text>
                        )}
                        <Input
                            placeholder={input.placeholder}
                            value={input.value}
                            onChangeText={(text) => onChangeInput(text, input.key)}
                            aria-labelledby={`${input.key}Label`}
                            keyboardType={input.key.includes('numero') || input.key.includes('cateto') || input.key.includes('hora') ? 'numeric' : 'default'}
                        />
                    </View>
                ))}
            </View>

            <View className='min-h-20 w-full max-w-md'>
                <Animated.View style={[animatedStyle]}>
                    {children}
                </Animated.View>
            </View>
        </View>
    )
}

// Ejemplo de uso para el ejercicio de Pitágoras
export function EjercicioPitagoras() {
    const [catetoA, setCatetoA] = React.useState<string>('')
    const [catetoB, setCatetoB] = React.useState<string>('')
    const [hipotenusa, setHipotenusa] = React.useState<number | null>(null)

    const inputs: InputConfig[] = [
        {
            key: 'catetoA',
            placeholder: '7',
            label: 'Ingrese cateto a:',
            value: catetoA,
            set: setCatetoA
        },
        {
            key: 'catetoB', 
            placeholder: '5',
            label: 'Ingrese cateto b:',
            value: catetoB,
            set: setCatetoB
        }
    ]

    const calcularHipotenusa = () => {
        if (catetoA && catetoB) {
            const a = parseFloat(catetoA)
            const b = parseFloat(catetoB)
            
            if (!isNaN(a) && !isNaN(b) && a > 0 && b > 0) {
                const c = Math.sqrt(a * a + b * b)
                setHipotenusa(c)
            } else {
                setHipotenusa(null)
            }
        }
    }

    React.useEffect(() => {
        calcularHipotenusa()
    }, [catetoA, catetoB])

    return (
        <EjercicioTemplateMultiple
            description="Escriba un programa que reciba como entrada las longitudes de los dos catetos a y b de un triángulo rectángulo, y que entregue como salida el largo de la hipotenusa c del triángulo, dado por el teorema de Pitágoras."
            inputs={inputs}
        >
            <View className='bg-background/50 p-4 rounded-lg border'>
                <Text className='text-center text-lg font-semibold'>
                    {hipotenusa !== null 
                        ? `La hipotenusa es ${hipotenusa.toFixed(16)}`
                        : 'Ingrese valores válidos para los catetos'
                    }
                </Text>
            </View>
        </EjercicioTemplateMultiple>
    )
}

