import {Text, Pressable, PressableProps, ScrollView} from "react-native"
import {clsx} from "clsx"
type CategoryProps = PressableProps &{
    title: string
    isSelected?: boolean
}

export function CategoryButton({title, isSelected, ...rest}: CategoryProps){
    return(
        <Pressable className={
            clsx("bg-slate-800 px-4 top--1 jusitfy-center rounded-md h-10 ", isSelected
            && "border-2 border-lime-300")}
           {...rest}
        >
          <Text className="text-slate-100 top-2 font-subtitle text-sm">{title}</Text>  
        </Pressable>
    )
}