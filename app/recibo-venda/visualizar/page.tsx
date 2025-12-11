"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PhoneCall, Mail, Globe2, ArrowLeft, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Item {
  descricao: string
  preco: string
}

interface ReciboData {
  nomeCliente: string
  telefoneCliente: string
  dataVenda: string
  formaPagamento: string
  desconto: string
  itens: Item[]
}

const fallbackEmpresa = {
  nome: "TECNO MANIA ASSISTÊNCIA & VARIEDADES",
  cnpj: "39.622.128.0001/22",
  endereco: "Av. Central Oeste, 244 – Cidade 2000, Papicu",
  telefone: "(85) 9 9821-3158",
  insta: "tecno_maniaa_",
  email: "tecnomaniaassistencia@gmail.com",
  site: "https://tecnomaniasite.vercel.app/",
  atendimento: "Seg a Sáb – 8h às 18h",
}

export default function VisualizarReciboVenda() {
  const [reciboData, setReciboData] = useState<ReciboData | null>(null)

  useEffect(() => {
    const data = localStorage.getItem("reciboVenda")
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
    // Remove tudo exceto números e vírgula/ponto
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

  const subtotal = calcularTotal()
  const desconto = parseFloat(reciboData?.desconto?.replace(/[^\d,\.]/g, "").replace(",", ".") || "0") || 0
  const total = subtotal - desconto

  if (!reciboData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-3 text-sm">
        <p>Nenhum dado de venda encontrado.</p>
        <Link href="/recibo-venda">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para preencher
          </Button>
        </Link>
      </div>
    )
  }

  const itensFormatados = reciboData.itens.map((item, idx) => ({
    rotulo: `${idx + 1}.`,
    nome: item.descricao,
    preco: formatarPreco(item.preco),
    total: formatarPreco(item.preco),
  }))

  return (
    <main className="min-h-screen bg-neutral-200 py-6">
      {/* Barra de ações */}
      <div className="print:hidden container mx-auto px-4 pb-4 flex gap-2 justify-start">
        <Link href="/recibo-venda">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Editar
          </Button>
        </Link>
        <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
          <Printer className="w-4 h-4 mr-2" /> Imprimir
        </Button>
      </div>

      <div className="mx-auto w-[830px] bg-white shadow-sm print:shadow-none print:bg-white px-8 py-6 border border-neutral-300">
        {/* Top ribbon */}
        <div className="h-2 bg-black mb-4" />

        {/* Header */}
        <div className="flex items-start gap-4 mb-3">
          <img 
            src="/logo-tecnomania.png" 
            alt="Logo Tecno Mania" 
            className="w-[92px] h-[92px] shrink-0 object-contain" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src === '/logo-tecnomania.png') {
                target.src = '/api/logo';
              } else if (!target.src.includes('placeholder')) {
                target.src = '/placeholder-logo.png';
              }
            }}
          />
          <div className="flex-1">
            <h1 className="text-[17px] font-black tracking-[0.3px] leading-tight">{fallbackEmpresa.nome}</h1>
            <p className="text-[11px] font-semibold">CNPJ: {fallbackEmpresa.cnpj}</p>
          </div>
        </div>

        {/* Faixa preta grande */}
        <div className="h-4 bg-black mb-6" />

        {/* Empresa / Data */}
        <div className="flex items-center justify-between text-[13px] font-bold mb-2 tracking-[0.2px]">
          <div className="flex items-center gap-2">
            <span>EMPRESA:</span>
          </div>
          <div className="flex items-center gap-2">
            <span>DATA:</span>
            <span>{formatarData(reciboData.dataVenda)}</span>
          </div>
        </div>

        {/* Contatos linha a linha */}
        <div className="text-[12px] leading-[16px] font-semibold mb-6 space-y-1">
          <p>Endereço: {fallbackEmpresa.endereco}</p>
          <p>Contatos: {fallbackEmpresa.telefone} | Insta: {fallbackEmpresa.insta}</p>
          <p>E-mail: {fallbackEmpresa.email} | Site: {fallbackEmpresa.site}</p>
          <p>Atendimento: {fallbackEmpresa.atendimento}</p>
        </div>

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

        {/* Total alinhado à direita (mesma coluna de descontos) */}
        <div className="mt-2 flex justify-end">
          <div className="bg-neutral-100 border border-neutral-300 px-4 py-2 text-[12px] font-black tracking-[1px] uppercase">
            TOTAL: R$ {total.toFixed(2).replace(".", ",")}
          </div>
        </div>

        {/* Linha separadora */}
        <div className="mt-6 mb-4 h-0 border-t-2 border-black w-[120px]"></div>

        {/* Informações de pagamento */}
        <div className="space-y-1 text-[12px] font-bold mb-4">
          <p>INFORMAÇÕES DE PAGAMENTOS:</p>
          <p className="font-semibold">Name: <span className="font-normal">{reciboData.nomeCliente}</span></p>
          <p className="font-semibold">Contato: <span className="font-normal">{reciboData.telefoneCliente}</span></p>
          <p className="font-semibold">Forma de pagamento: <span className="font-normal">{reciboData.formaPagamento}</span></p>
        </div>

        {/* Termos */}
        <div className="text-[11.5px] leading-[17px] font-semibold space-y-1 mb-8">
          <p className="text-red-600">TERMOS & CONDIÇÕES:</p>
          <p>
            Garantia <span className="text-red-600">Válida por 3 meses Sobre somente venda de acessórios</span>, serviços prestados
            por nós também <span className="text-red-600">contem garantia de 3 meses (noventa dias)</span> após a impressão deste
            recibo.
          </p>
        </div>

        {/* Rodapé preto */}
        <div className="mt-10 bg-black text-white text-[10.5px] font-semibold px-4 py-3 flex items-center gap-6 justify-center">
          <div className="flex items-center gap-2"><PhoneCall className="w-4 h-4" />{fallbackEmpresa.telefone}</div>
          <div className="flex items-center gap-2"><Mail className="w-4 h-4" />{fallbackEmpresa.email}</div>
          <div className="flex items-center gap-2"><Globe2 className="w-4 h-4" />{fallbackEmpresa.site}</div>
        </div>
      </div>
    </main>
  )
}
