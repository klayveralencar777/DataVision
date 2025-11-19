import { UnauthorizedError } from "../exceptions/Exceptions.js"

export class GroqAIService {

    constructor() {
        this.apiURL = process.env.GROQ_API_URL
        this.apiKEY = process.env.GROQ_API_KEY
    }



    async generateAnalysis(token) {
        const metricsResponse = await fetch("http://localhost:3555/metrics", {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (!metricsResponse) {
            throw new UnauthorizedError(`Erro ao buscar as métricas.`)
        }
        const dataMetrics = await metricsResponse.json()
        
        const prompt = `Quero que você analise as métricas a seguir e produza um relatório claro, 
                        organizado e altamente legível.
                        ###  Objetivo da análise
                        Gerar insights para:
                        - aumentar o lucro,
                        - melhorar a retenção de clientes,
                        - escalar o negócio.
                        ###  Regras obrigatórias do formato
                        - NÃO retorne JSON.
                        - Estruture como um **relatório profissional**.
                        - Separe por TÍTULOS e SUBTÍTULOS.
                        - Use tópicos, bullets e parágrafos curtos.
                        - Use linguagem clara, direta e com recomendações práticas.

                        ### Métricas para análise:
                        ${JSON.stringify(dataMetrics, null, 2)}

                        Agora gere a análise seguindo exatamente esse formato:
                        1. **Resumo Executivo**
                        2. **Análise de Cada Métrica**
                        - Nome da métrica
                        - Interpretação
                        - Problemas encontrados
                        - Oportunidades
                        - Propostas de melhoria
                        3. **Insights Estratégicos**
                        4. **Plano de Ação Recomendo (3 a 5 passos)**`

        const responseToGroq = await fetch(this.apiURL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${this.apiKEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "llama-3.1-8b-instant",
                messages: [{ role: "user", content: prompt }],
            })
        })

        const data = await responseToGroq.json()
        return data.choices[0].message.content
    }

}
