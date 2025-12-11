"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ReciboServicoPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nomeCliente: "",
    telefoneCliente: "",
    cpfCliente: "",
    servicoExecutado: "",
    valorServico: "",
    dataExecucao: "",
    formaPagamento: "Dinheiro",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Salva os dados no localStorage
    localStorage.setItem("reciboServico", JSON.stringify(formData))

    // Redireciona para a página de visualização
    router.push("/recibo-servico/visualizar")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">Recibo de Serviço</CardTitle>
            <CardDescription>Preencha as informações para gerar o recibo com garantia de 90 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informações do Cliente */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-900">Dados do Cliente</h3>

                <div>
                  <Label htmlFor="nomeCliente">Nome do Cliente *</Label>
                  <Input
                    id="nomeCliente"
                    name="nomeCliente"
                    value={formData.nomeCliente}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="Nome completo"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="telefoneCliente">Telefone para Contato *</Label>
                    <Input
                      id="telefoneCliente"
                      name="telefoneCliente"
                      value={formData.telefoneCliente}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="(85) 99999-9999"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cpfCliente">CPF</Label>
                    <Input
                      id="cpfCliente"
                      name="cpfCliente"
                      value={formData.cpfCliente}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>
              </div>

              {/* Informações do Serviço */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-900">Dados do Serviço</h3>

                <div>
                  <Label htmlFor="servicoExecutado">Serviço Executado *</Label>
                  <Textarea
                    id="servicoExecutado"
                    name="servicoExecutado"
                    value={formData.servicoExecutado}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="Descreva o serviço realizado"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="valorServico">Valor do Serviço *</Label>
                  <Input
                    id="valorServico"
                    name="valorServico"
                    value={formData.valorServico}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="R$ 0,00"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dataExecucao">Data da Execução *</Label>
                    <Input
                      id="dataExecucao"
                      name="dataExecucao"
                      type="date"
                      value={formData.dataExecucao}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="formaPagamento">Forma de Pagamento *</Label>
                    <select
                      id="formaPagamento"
                      name="formaPagamento"
                      value={formData.formaPagamento}
                      onChange={handleChange}
                      required
                      className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="Dinheiro">Dinheiro</option>
                      <option value="Crédito">Crédito</option>
                      <option value="Débito">Débito</option>
                      <option value="PIX">PIX</option>
                    </select>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Gerar Recibo
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
