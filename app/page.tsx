"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FileText, Receipt, Pencil, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface DadosEmpresa {
  nome: string
  cnpj: string
  endereco: string
  telefone: string
  email: string
  site: string
  insta: string
  atendimento: string
}

const dadosPadrao: DadosEmpresa = {
  nome: "TECNO MANIA ASSISTÊNCIA & VARIEDADES",
  cnpj: "39.622.128.0001/22",
  endereco: "Av. Central Oeste, 244 – Cidade 2000, Papicu",
  telefone: "(85) 9 9821-3158",
  email: "tecnomaniaassistencia@gmail.com",
  site: "https://tecnomaniasite.vercel.app/",
  insta: "tecno_maniaa_",
  atendimento: "Seg a Sáb – 8h às 18h",
}

export default function HomePage() {
  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa>(dadosPadrao)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formData, setFormData] = useState<DadosEmpresa>(dadosPadrao)

  useEffect(() => {
    const dados = localStorage.getItem("dadosEmpresa")
    if (dados) {
      const parsed = JSON.parse(dados)
      setDadosEmpresa(parsed)
      setFormData(parsed)
    }
  }, [])

  const handleSalvar = () => {
    localStorage.setItem("dadosEmpresa", JSON.stringify(formData))
    setDadosEmpresa(formData)
    setDialogOpen(false)
  }

  const handleRestaurar = () => {
    setFormData(dadosPadrao)
    localStorage.setItem("dadosEmpresa", JSON.stringify(dadosPadrao))
    setDadosEmpresa(dadosPadrao)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900">Sistema de Recibos</h1>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Settings className="w-5 h-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Configurar Dados da Empresa</DialogTitle>
                  <DialogDescription>
                    Estes dados serão usados nos recibos de Venda e Serviço
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="nome">Nome da Empresa</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Nome da empresa"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={formData.cnpj}
                      onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                      placeholder="00.000.000/0001-00"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      value={formData.endereco}
                      onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                      placeholder="Rua, número, bairro"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      placeholder="(00) 0 0000-0000"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contato@empresa.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="site">Site</Label>
                    <Input
                      id="site"
                      value={formData.site}
                      onChange={(e) => setFormData({ ...formData, site: e.target.value })}
                      placeholder="https://seusite.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="insta">Instagram (sem @)</Label>
                    <Input
                      id="insta"
                      value={formData.insta}
                      onChange={(e) => setFormData({ ...formData, insta: e.target.value })}
                      placeholder="seu_instagram"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="atendimento">Horário de Atendimento</Label>
                    <Input
                      id="atendimento"
                      value={formData.atendimento}
                      onChange={(e) => setFormData({ ...formData, atendimento: e.target.value })}
                      placeholder="Seg a Sex – 8h às 18h"
                    />
                  </div>
                </div>
                <DialogFooter className="flex gap-2">
                  <Button variant="outline" onClick={handleRestaurar}>
                    Restaurar Padrão
                  </Button>
                  <Button onClick={handleSalvar}>Salvar Alterações</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <p className="text-lg text-blue-700 mb-2">{dadosEmpresa.nome}</p>
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
