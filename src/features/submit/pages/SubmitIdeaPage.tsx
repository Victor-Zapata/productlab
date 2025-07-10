import { Layout } from '@/shared/ui/Layout'
import { IdeaForm } from '../components/IdeaForm'

export const SubmitIdeaPage = () => {
    return (
        <Layout>
            <h1 className="text-3xl font-bold mb-6">Proponé tu idea 💡</h1>
            <IdeaForm />
        </Layout>
    )
}
