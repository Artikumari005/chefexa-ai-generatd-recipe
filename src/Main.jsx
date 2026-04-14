import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromMistral } from "./ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState(
        []
    )
    const [recipe, setRecipe] = React.useState("")
    const [recipeShown, setRecipeShown] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    async function toggleRecipeShown() {
        if (recipeShown) {
            setRecipeShown(false)
        } else {
            setIsLoading(true)
            try {
                const generatedRecipe = await getRecipeFromMistral(ingredients)
                setRecipe(generatedRecipe)
                setRecipeShown(true)
            } catch (error) {
                console.error("Error generating recipe:", error)
                setRecipe(`Sorry, there was an error generating the recipe.\n\n${error.message}`)
                setRecipeShown(true)
            } finally {
                setIsLoading(false)
            }
        }
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ingredients={ingredients}
                    toggleRecipeShown={toggleRecipeShown}
                />
            }

            {recipeShown && <ClaudeRecipe recipe={recipe} isLoading={isLoading} />}
            {!recipeShown && isLoading && <p>Loading recipe...</p>}
        </main>
    )
}
