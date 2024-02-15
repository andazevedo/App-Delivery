import {View, Text, FlatList, SectionList} from "react-native"
import {Link} from "expo-router"
import {Header} from "@/components/header"
import { CategoryButton } from "@/components/category-button"
import { CATEGORIES, MENU, ProductProps } from "@/utils/data/products"
import { useState, useRef } from "react"
import { Product } from "@/components/product"
import { useCartStore } from "@/stores/cart-store"


export default function Home(){
    const cartStore = useCartStore()
  const[category, setcategory] = useState(CATEGORIES[0])

  const sectionListRef = useRef<SectionList<ProductProps>>(null)

  const carquantityItens  = cartStore.products.reduce((total, product) => total + product.quantity, 0)

function handleCategorySelect(selectedcategory: string){
    console.log(selectedcategory)
    setcategory(selectedcategory)

    const sectionIndex = CATEGORIES.findIndex((category)=> category === selectedcategory)
    if(sectionListRef.current){
        sectionListRef.current.scrollToLocation({
            animated: true,
            sectionIndex,
            itemIndex: 0,     
        })
    }
}

    return(
        <View className="flex-1 pt-8">
        <Header title="Faça seu pedido" cartquantityItens={carquantityItens}/>

        <FlatList
        data={CATEGORIES}
        keyExtractor={(item)=>item}
        renderItem={({item})=><CategoryButton title={item}
        isSelected={item===category}
        onPress={()=>handleCategorySelect(item)} />}
        horizontal
        className="max-h-10 mt-5"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{gap:12, paddingHorizontal:20}}
        >
        
        </FlatList>
        
        <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={(
            {item}) =>( 
            <Link href={`/product/${item.id}`} asChild>
              <Product data={item}></Product>
            </Link>
        )}
        renderSectionHeader={({section: {title}}) => (
            <Text className= "text-xl text-white font-heading mt-8 mb-3">
                {title}
            </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={ { paddingBottom:100 }}

        >   
        </SectionList>

        </View>
    )
} 
