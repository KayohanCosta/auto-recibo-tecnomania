import Link from "next/link"
import { FileText, Receipt, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">Sistema de Recibos</h1>
          <p className="text-lg text-blue-700 mb-2">Tecno Mania Assistência & Variedades</p>
          <p className="text-sm text-muted-foreground">Gere recibos profissionais em segundos</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Recibo de Serviço */}
          <Card className="hover:shadow-xl transition-shadow border-2 border-blue-100">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-blue-900">Recibo de Serviço</CardTitle>
              <CardDescription className="text-base">Garantia de 90 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Serviços de assistência técnica
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Garantia de 3 meses
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Pronto para impressão
                </li>
              </ul>
              <Link href="/recibo-servico">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Criar Recibo de Serviço</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recibo de Venda */}
          <Card className="hover:shadow-xl transition-shadow border-2 border-blue-100">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Receipt className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-blue-900">Recibo de Venda</CardTitle>
              <CardDescription className="text-base">Garantia de 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Venda de produtos e acessórios
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Garantia de 30 dias
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Pronto para impressão
                </li>
              </ul>
              <Link href="/recibo-venda">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Criar Recibo de Venda</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recibo Personalizado */}
          <Card className="hover:shadow-xl transition-shadow border-2 border-green-100">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Pencil className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-900">Recibo Personalizado</CardTitle>
              <CardDescription className="text-base">Totalmente customizável</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                  Dados da empresa customizados
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                  Upload de logo própria
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                  Venda ou Serviço
                </li>
              </ul>
              <Link href="/recibo-personalizado">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Criar Recibo Personalizado</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Preencha o formulário e gere seu recibo automaticamente</p>
        </div>
      </div>
    </div>
  )
}
