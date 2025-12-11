"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Plus, Trash2, Upload } from "lucide-react"
import Link from "next/link"

interface Item {
  descricao: string
  preco: string
}

export default function ReciboPersonalizadoPage() {
  const router = useRouter()
  const [logoPreview, setLogoPreview] = useState<string>("")
  
  const [formData, setFormData] = useState({
    // Dados da empresa
    nomeEmpresa: "",
    cnpj: "",
    endereco: "",
    telefone: "",
    email: "",
    site: "",
    instagram: "",
    atendimento: "",
    
    // Dados do cliente
    nomeCliente: "",
    telefoneCliente: "",
    cpfCliente: "",
    
    // Dados da transação
    tipoRecibo: "venda", // venda ou servico
    dataEmissao: "",
    formaPagamento: "Dinheiro",
    desconto: "",
    
    // Serviço (se aplicável)
    servicoExecutado: "",
    valorServico: "",
    garantiaDias: "90",
    
    // Logo
    logoUrl: "",
  })

  const [itens, setItens] = useState<Item[]>([{ descricao: "", preco: "" }])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("reciboPersonalizado", JSON.stringify({ ...formData, itens }))
    router.push("/recibo-personalizado/visualizar")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setLogoPreview(base64)
        setFormData({ ...formData, logoUrl: base64 })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        <Card className="border-2 border-blue-100">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-900">Recibo Personalizado</CardTitle>
            <CardDescription>Preencha todas as informações para criar um recibo totalmente customizado</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Logo da Empresa */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-900">Logo da Empresa</h3>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor="logo">Carregar Logo</Label>
                    <div className="mt-1 flex items-center gap-2">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="flex-1"
                      />
                      <Upload className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  
                  {logoPreview && (
                    <div className="w-24 h-24 border-2 border-gray-200 rounded-lg overflow-hidden">
                      <img src={logoPreview} alt="Preview" className="w-full h-full object-contain" />
                    </div>
                  )}
                </div>
              </div>

              {/* Dados da Empresa */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-900">Dados da Empresa</h3>

                <div>
                  <Label htmlFor="nomeEmpresa">Nome da Empresa *</Label>
                  <Input
                    id="nomeEmpresa"
                    name="nomeEmpresa"
                    value={formData.nomeEmpresa}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="Nome completo da empresa"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cnpj">CNPJ *</Label>
                    <Input
                      id="cnpj"
                      name="cnpj"
                      value={formData.cnpj}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="00.000.000/0000-00"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      name="telefone"
                      value={formData.telefone}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="endereco">Endereço *</Label>
                  <Input
                    id="endereco"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleChange}
                    required
                    className="mt-1"
                    placeholder="Rua, número, bairro, cidade"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="contato@empresa.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="site">Site</Label>
                    <Input
                      id="site"
                      name="site"
                      value={formData.site}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="www.empresa.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="instagram">Instagram</Label>
                    <Input
                      id="instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="mt-1"
                      placeholder="@empresa"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="atendimento">Horário de Atendimento</Label>
                  <Input
                    id="atendimento"
                    name="atendimento"
                    value={formData.atendimento}
                    onChange={handleChange}
                    className="mt-1"
                    placeholder="Seg a Sex – 8h às 18h"
                  />
                </div>
              </div>

              {/* Tipo de Recibo */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-900">Tipo de Recibo</h3>
                
                <div>
                  <Label htmlFor="tipoRecibo">Selecione o Tipo *</Label>
                  <select
                    id="tipoRecibo"
                    name="tipoRecibo"
                    value={formData.tipoRecibo}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="venda">Venda de Produtos</option>
                    <option value="servico">Serviço Executado</option>
                  </select>
                </div>
              </div>

              {/* Dados do Cliente */}
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
                    <Label htmlFor="telefoneCliente">Telefone do Cliente *</Label>
                    <Input
                      id="telefoneCliente"
                      name="telefoneCliente"
                      value={formData.telefoneCliente}
                      onChange={handleChange}
                      required
                      className="mt-1"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cpfCliente">CPF do Cliente</Label>
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

              {/* Itens de Venda (se tipo = venda) */}
              {formData.tipoRecibo === "venda" && (
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
              )}

              {/* Dados do Serviço (se tipo = servico) */}
              {formData.tipoRecibo === "servico" && (
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

                  <div className="grid md:grid-cols-2 gap-4">
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

                    <div>
                      <Label htmlFor="garantiaDias">Garantia (dias)</Label>
                      <Input
                        id="garantiaDias"
                        name="garantiaDias"
                        type="number"
                        value={formData.garantiaDias}
                        onChange={handleChange}
                        className="mt-1"
                        placeholder="90"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Informações de Pagamento */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-900">Informações de Pagamento</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dataEmissao">Data de Emissão *</Label>
                    <Input
                      id="dataEmissao"
                      name="dataEmissao"
                      type="date"
                      value={formData.dataEmissao}
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
                      <option value="Boleto">Boleto</option>
                      <option value="Transferência">Transferência</option>
                    </select>
                  </div>
                </div>

                {formData.tipoRecibo === "venda" && (
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
                )}
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Gerar Recibo Personalizado
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
