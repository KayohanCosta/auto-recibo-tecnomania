"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"
import Link from "next/link"

interface Item {
  descricao: string
  preco: string
}

export default function ReciboVendaPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    nomeCliente: "",
    telefoneCliente: "",
    dataVenda: "",
    formaPagamento: "Dinheiro",
    desconto: "",
  })

  const [itens, setItens] = useState<Item[]>([{ descricao: "", preco: "" }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Salva os dados no localStorage
    localStorage.setItem("reciboVenda", JSON.stringify({ ...formData, itens }))

    // Redireciona para a página de visualização
    router.push("/recibo-venda/visualizar")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleItemChange = (index: number, field: "descricao" | "preco", value: string) => {
    const novosItens = [...itens]
    novosItens[index][field] = value
    setItens(novosItens)
  }

  const adicionarItem = () => {
    setItens([...itens, { descricao: "", preco: "" }])
  }

  const removerItem = (index: number) => {
    if (itens.length > 1) {
      const novosItens = itens.filter((_, i) => i !== index)
      setItens(novosItens)
    }
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
            <CardTitle className="text-2xl text-blue-900">Recibo de Venda</CardTitle>
            <CardDescription>Preencha as informações para gerar o recibo com garantia de 30 dias</CardDescription>
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
              </div>

              {/* Itens */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-blue-900">Itens da Venda</h3>
                  <Button type="button" onClick={adicionarItem} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar Item
                  </Button>
                </div>

                {itens.map((item, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <div className="flex-1">
                      <Label htmlFor={`item-desc-${index}`}>Item {index + 1} *</Label>
                      <Input
                        id={`item-desc-${index}`}
                        value={item.descricao}
                        onChange={(e) => handleItemChange(index, "descricao", e.target.value)}
                        required
                        className="mt-1"
                        placeholder="Descrição do item"
                      />
                    </div>
                    <div className="w-32">
                      <Label htmlFor={`item-preco-${index}`}>Preço *</Label>
                      <Input
                        id={`item-preco-${index}`}
                        value={item.preco}
                        onChange={(e) => handleItemChange(index, "preco", e.target.value)}
                        required
                        className="mt-1"
                        placeholder="R$ 0,00"
                      />
                    </div>
                    {itens.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removerItem(index)}
                        variant="ghost"
                        size="icon"
                        className="mt-8"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* Informações de Pagamento */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-900">Informações de Pagamento</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dataVenda">Data da Venda *</Label>
                    <Input
                      id="dataVenda"
                      name="dataVenda"
                      type="date"
                      value={formData.dataVenda}
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

                <div>
                  <Label htmlFor="desconto">Desconto (R$)</Label>
                  <Input
                    id="desconto"
                    name="desconto"
                    value={formData.desconto}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="R$ 0,00"
                  />
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
