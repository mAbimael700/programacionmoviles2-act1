import React from "react"
import { View } from "react-native"
import EjercicioTemplateMultiple, { InputConfig } from "~/components/activity/EjercicioMultipleTemplate"
import { Text } from "~/components/ui/text"

export default function EjercicioPitagoras() {
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
            <View className=''>
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