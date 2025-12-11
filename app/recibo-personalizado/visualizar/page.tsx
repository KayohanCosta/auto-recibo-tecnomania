"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer, PhoneCall, Mail, Globe2 } from "lucide-react"
import Link from "next/link"

interface Item {
  descricao: string
  preco: string
}

interface ReciboData {
  nomeEmpresa: string
  cnpj: string
  endereco: string
  telefone: string
  email: string
  site: string
  instagram: string
  atendimento: string
  nomeCliente: string
  telefoneCliente: string
  cpfCliente: string
  tipoRecibo: string
  dataEmissao: string
  formaPagamento: string
  desconto: string
  servicoExecutado: string
  valorServico: string
  garantiaDias: string
  logoUrl: string
  itens: Item[]
}

export default function VisualizarReciboPersonalizado() {
  const [reciboData, setReciboData] = useState<ReciboData | null>(null)

  useEffect(() => {
    const data = localStorage.getItem("reciboPersonalizado")
    if (data) {
      setReciboData(JSON.parse(data))
    }
  }, [])

  const handlePrint = () => window.print()

  const formatarData = (valor?: string) => {
    if (!valor) return "__/__/____"
    const d = new Date(valor + "T00:00:00")
    if (Number.isNaN(d.getTime())) return valor
    const dia = String(d.getDate()).padStart(2, "0")
    const mes = String(d.getMonth() + 1).padStart(2, "0")
    const ano = d.getFullYear()
    return `${dia}/${mes}/${ano}`
  }

  const formatarPreco = (valor: string) => {
    if (!valor) return "R$ 0,00"
    const nums = valor.replace(/[^\d,\.]/g, "")
    return valor.includes("R$") ? valor : `R$ ${nums}`
  }

  const calcularTotal = () => {
    if (!reciboData?.itens) return 0
    return reciboData.itens.reduce((acc, item) => {
      const preco = parseFloat(item.preco.replace(/[^\d,\.]/g, "").replace(",", ".")) || 0
      return acc + preco
    }, 0)
  }

  const validade = useMemo(() => {
    if (!reciboData?.dataEmissao || !reciboData?.garantiaDias) return "__/__/____"
    const d = new Date(reciboData.dataEmissao + "T00:00:00")
    if (Number.isNaN(d.getTime())) return "__/__/____"
    d.setDate(d.getDate() + parseInt(reciboData.garantiaDias))
    return formatarData(d.toISOString().slice(0, 10))
  }, [reciboData?.dataEmissao, reciboData?.garantiaDias])

  if (!reciboData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-3 text-sm">
        <p>Nenhum dado encontrado.</p>
        <Link href="/recibo-personalizado">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para preencher
          </Button>
        </Link>
      </div>
    )
  }

  const subtotal = reciboData.tipoRecibo === "venda" ? calcularTotal() : parseFloat(reciboData.valorServico?.replace(/[^\d,\.]/g, "").replace(",", ".") || "0")
  const desconto = parseFloat(reciboData?.desconto?.replace(/[^\d,\.]/g, "").replace(",", ".") || "0") || 0
  const total = subtotal - desconto

  const itensFormatados = reciboData.itens?.map((item, idx) => ({
    rotulo: `${idx + 1}.`,
    nome: item.descricao,
    preco: formatarPreco(item.preco),
    total: formatarPreco(item.preco),
  })) || []

  const defaultLogo = "/logo-tecnomania.svg"
  const logoSrc = reciboData.logoUrl || defaultLogo

  return (
    <main className="min-h-screen bg-neutral-200 py-6">
      {/* Barra de ações */}
      <div className="print:hidden container mx-auto px-4 pb-4 flex gap-2 justify-start">
        <Link href="/recibo-personalizado">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Editar
          </Button>
        </Link>
        <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
          <Printer className="w-4 h-4 mr-2" /> Imprimir
        </Button>
      </div>

      <div className="mx-auto w-[830px] bg-white text-black px-8 py-6 shadow-sm print:shadow-none print:bg-white border border-neutral-300">
        {/* Faixa topo */}
        <div className="h-2 bg-black mb-4" />

        {/* Header */}
        <div className="flex items-start gap-4 mb-3">
          <img
            src={logoSrc}
            alt="Logo"
            className="w-[92px] h-[92px] object-contain shrink-0"
            onError={(e) => {
              const target = e.currentTarget
              if (target.src === logoSrc && logoSrc !== "/logo-tecnomania.svg") {
                target.src = "/api/logo"
              } else if (!target.src.includes("api") && !target.src.includes("placeholder")) {
                target.src = "/logo-tecnomania.png"
              } else if (!target.src.includes("placeholder")) {
                target.src = "/placeholder-logo.png"
              }
            }}
          />
          <div className="flex-1">
            <h1 className="text-[17px] font-black tracking-[0.3px] leading-tight">{reciboData.nomeEmpresa}</h1>
            <p className="text-[11px] font-semibold">CNPJ: {reciboData.cnpj}</p>
          </div>
        </div>

        {/* Faixa preta */}
        <div className="h-4 bg-black mb-6" />

        {/* Empresa / Data */}
        <div className="flex items-center justify-between text-[13px] font-bold mb-2 tracking-[0.2px]">
          <div className="flex items-center gap-2">
            <span>EMPRESA:</span>
          </div>
          <div className="flex items-center gap-2">
            <span>DATA:</span>
            <span>{formatarData(reciboData.dataEmissao)}</span>
          </div>
        </div>

        {/* Contatos linha a linha */}
        <div className="text-[12px] leading-[16px] font-semibold mb-6 space-y-1">
          <p>Endereço: {reciboData.endereco}</p>
          <p>Contatos: {reciboData.telefone}{reciboData.instagram && ` | Insta: ${reciboData.instagram}`}</p>
          {reciboData.email && <p>E-mail: {reciboData.email}{reciboData.site && ` | Site: ${reciboData.site}`}</p>}
          {reciboData.atendimento && <p>Atendimento: {reciboData.atendimento}</p>}
        </div>

        {/* Recibo de Venda */}
        {reciboData.tipoRecibo === "venda" && (
          <>
            {/* Tabela */}
            <div className="border border-black">
              <div className="grid grid-cols-[12%_46%_21%_21%] bg-black text-white text-[12px] font-bold uppercase tracking-[2px]">
                <div className="px-3 py-2">Item</div>
                <div className="px-3 py-2">Descrição</div>
                <div className="px-3 py-2">Preço</div>
                <div className="px-3 py-2">Total</div>
              </div>
              <div className="text-[12px] font-semibold">
                {itensFormatados.map((item, idx) => (
                  <div
                    key={idx}
                    className={`grid grid-cols-[12%_46%_21%_21%] px-3 py-2 ${idx % 2 === 0 ? "bg-neutral-100" : "bg-neutral-200"}`}
                  >
                    <div className="text-center">{item.rotulo}</div>
                    <div>{item.nome}</div>
                    <div className="text-right">{item.preco}</div>
                    <div className="text-right">{item.total}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totais à direita */}
            <div className="mt-4 text-[12px] text-right space-y-1 font-semibold">
              <div>
                <span className="font-normal">Total:</span> R$ {subtotal.toFixed(2).replace(".", ",")}
              </div>
              <div className="text-red-600">
                <span className="font-normal">Descontos:</span> R$ {desconto.toFixed(2).replace(".", ",")}
              </div>
            </div>

            {/* Total alinhado à direita */}
            <div className="mt-2 flex justify-end">
              <div className="bg-neutral-100 border border-neutral-300 px-4 py-2 text-[12px] font-black tracking-[1px] uppercase">
                TOTAL: R$ {total.toFixed(2).replace(".", ",")}
              </div>
            </div>
          </>
        )}

        {/* Recibo de Serviço */}
        {reciboData.tipoRecibo === "servico" && (
          <>
            {/* Cliente */}
            <div className="text-[13px] font-bold mb-2 tracking-[0.2px]">
              <span>CLIENTE:</span>
            </div>

            <div className="text-[12px] leading-[16px] font-semibold mb-6 space-y-1">
              <p>Nome: {reciboData.nomeCliente}</p>
              <p>Telefone: {reciboData.telefoneCliente}</p>
              {reciboData.cpfCliente && <p>CPF: {reciboData.cpfCliente}</p>}
            </div>

            {/* Serviço executado */}
            <div className="text-[13px] font-bold mb-2 tracking-[0.2px]">
              <span>SERVIÇO EXECUTADO:</span>
            </div>

            <div className="text-[12px] leading-[16px] font-semibold mb-6">
              <p>{reciboData.servicoExecutado}</p>
            </div>

            {/* Valor do serviço */}
            <div className="text-[13px] font-bold mb-2 tracking-[0.2px]">
              <span>VALOR DO SERVIÇO:</span>
            </div>

            <div className="text-[12px] leading-[16px] font-semibold mb-6">
              <p>{formatarPreco(reciboData.valorServico)}</p>
            </div>

            {/* Prazo e Validade */}
            <div className="text-[13px] font-bold mb-2 tracking-[0.2px]">
              <span>PRAZO DE GARANTIA:</span>
            </div>

            <div className="text-[12px] leading-[16px] font-semibold mb-6">
              <p>{reciboData.garantiaDias} dias - Válido até: {validade}</p>
            </div>
          </>
        )}

        {/* Linha separadora */}
        <div className="mt-6 mb-4 h-0 border-t-2 border-black w-[120px]"></div>

        {/* Informações de pagamento */}
        <div className="space-y-1 text-[12px] font-bold mb-4">
          <p>INFORMAÇÕES DE PAGAMENTOS:</p>
          <p className="font-semibold">
            Nome: <span className="font-normal">{reciboData.nomeCliente}</span>
          </p>
          <p className="font-semibold">
            Contato: <span className="font-normal">{reciboData.telefoneCliente}</span>
          </p>
          <p className="font-semibold">
            Forma de pagamento: <span className="font-normal">{reciboData.formaPagamento}</span>
          </p>
        </div>

        {/* Termos */}
        <div className="text-[11.5px] leading-[17px] font-semibold space-y-1 mb-8">
          <p className="text-red-600">TERMOS & CONDIÇÕES:</p>
          <p>
            {reciboData.tipoRecibo === "venda" 
              ? "Garantia válida conforme legislação vigente. Conserve este recibo para efeito de garantia."
              : `Garantia válida por ${reciboData.garantiaDias} dias sobre o serviço executado. Conserve este recibo para efeito de garantia.`
            }
          </p>
        </div>

        {/* Rodapé preto */}
        <div className="mt-10 bg-black text-white text-[10.5px] font-semibold px-4 py-3 flex items-center gap-6 justify-center">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4" />
            {reciboData.telefone}
          </div>
          {reciboData.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {reciboData.email}
            </div>
          )}
          {reciboData.site && (
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4" />
              {reciboData.site}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
