"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer, PhoneCall, Mail, Globe2 } from "lucide-react"
import Link from "next/link"

interface ReciboData {
  nomeCliente: string
  telefoneCliente: string
  cpfCliente: string
  servicoExecutado: string
  valorServico: string
  dataExecucao: string
  formaPagamento: string
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

export default function VisualizarReciboServico() {
  const [reciboData, setReciboData] = useState<ReciboData | null>(null)

  useEffect(() => {
    const data = localStorage.getItem("reciboServico")
    if (data) {
      const parsed = JSON.parse(data)
      setReciboData(parsed)
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

  const validade = useMemo(() => {
    if (!reciboData?.dataExecucao) return "__/__/____"
    const d = new Date(reciboData.dataExecucao + "T00:00:00")
    if (Number.isNaN(d.getTime())) return "__/__/____"
    d.setDate(d.getDate() + 90)
    return formatarData(d.toISOString().slice(0, 10))
  }, [reciboData?.dataExecucao])

  if (!reciboData) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-3 text-sm">
        <p>Nenhum dado de serviço encontrado.</p>
        <Link href="/recibo-servico">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para preencher
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-neutral-200 py-6">
      {/* Barra de ações */}
      <div className="print:hidden container mx-auto px-4 pb-4 flex gap-2 justify-start">
        <Link href="/recibo-servico">
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
            src="/logo-tecnomania.png" 
            alt="Logo Tecno Mania" 
            className="w-[92px] h-[92px] shrink-0 object-contain" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.includes('placeholder')) {
                target.src = '/placeholder-logo.png';
              }
            }}
          />
          <div className="flex-1">
            <h1 className="text-[17px] font-black tracking-[0.3px] leading-tight">{fallbackEmpresa.nome}</h1>
            <p className="text-[11px] font-semibold">CNPJ: {fallbackEmpresa.cnpj}</p>
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
            <span>{formatarData(reciboData.dataExecucao)}</span>
          </div>
        </div>

        {/* Contatos linha a linha */}
        <div className="text-[12px] leading-[16px] font-semibold mb-6 space-y-1">
          <p>Endereço: {fallbackEmpresa.endereco}</p>
          <p>Contatos: {fallbackEmpresa.telefone} | Insta: {fallbackEmpresa.insta}</p>
          <p>E-mail: {fallbackEmpresa.email} | Site: {fallbackEmpresa.site}</p>
          <p>Atendimento: {fallbackEmpresa.atendimento}</p>
        </div>

        {/* Cliente */}
        <div className="text-[13px] font-bold mb-2 tracking-[0.2px]">
          <span>CLIENTE:</span>
        </div>

        <div className="text-[12px] leading-[16px] font-semibold mb-6 space-y-1">
          <p>Nome: {reciboData.nomeCliente || "Nome do cliente"}</p>
          <p>Telefone: {reciboData.telefoneCliente || "Telefone"}</p>
          <p>CPF: {reciboData.cpfCliente || "CPF"}</p>
        </div>

        {/* Serviço executado */}
        <div className="text-[13px] font-bold mb-2 tracking-[0.2px]">
          <span>SERVIÇO EXECUTADO:</span>
        </div>

        <div className="text-[12px] leading-[16px] font-semibold mb-6">
          <p>{reciboData.servicoExecutado || "Descrição do serviço"}</p>
        </div>

        {/* Valor do serviço */}
        <div className="text-[13px] font-bold mb-2 tracking-[0.2px]">
          <span>VALOR DO SERVIÇO:</span>
        </div>

        <div className="text-[12px] leading-[16px] font-semibold mb-6">
          <p>{reciboData.valorServico || "R$ 0,00"}</p>
        </div>

        {/* Prazo e Validade */}
        <div className="text-[13px] font-bold mb-2 tracking-[0.2px]">
          <span>PRAZO DE GARANTIA:</span>
        </div>

        <div className="text-[12px] leading-[16px] font-semibold mb-6">
          <p>90 dias (noventa dias) - Válido até: {validade}</p>
        </div>

        {/* Linha separadora */}
        <div className="mt-6 mb-4 h-0 border-t-2 border-black w-[120px]"></div>

        {/* Informações de pagamento */}
        <div className="space-y-1 text-[12px] font-bold mb-4">
          <p>INFORMAÇÕES DE PAGAMENTOS:</p>
          <p className="font-semibold">
            Name: <span className="font-normal">{reciboData.nomeCliente || "Nome do cliente"}</span>
          </p>
          <p className="font-semibold">
            Contato: <span className="font-normal">{reciboData.telefoneCliente || "Telefone para contato"}</span>
          </p>
          <p className="font-semibold">
            Forma de pagamento: <span className="font-normal">{reciboData.formaPagamento}</span>
          </p>
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
