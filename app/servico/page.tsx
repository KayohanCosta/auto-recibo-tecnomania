import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Nota de Garantia de Serviço",
}

const data = {
  data: "10/12/2025",
  empresa: "Prestadora XYZ",
  cnpj: "12.345.678/0001-99",
  endereco: "Av. Central, 123 - Sala 45",
  telefone: "(11) 4000-5000",
  cliente: "Ciclano da Silva",
  cpf: "123.456.789-00",
  servico: "123.456.789-00",
  dataExecucao: "10/12/2025",
  prazo: "90 dias corridos a partir da data da execução.",
  validade: "90 dias",
  assinaturaPrestador: "Tecnico Responsavel",
  assinaturaCliente: "Cliente",
}

const Title = ({ children }: { children: string }) => (
  <h1 className="text-[21px] font-black tracking-[0.4px] text-center leading-[26px] uppercase">{children}</h1>
)

const Label = ({ children }: { children: string }) => (
  <span className="font-[800] text-[14px] leading-[18px] tracking-[0.2px] whitespace-pre">{children}</span>
)

const Line = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-row gap-2 text-[14px] leading-[18px]">
    {children}
  </div>
)

export default function ServicoPage() {
  return (
    <main className="min-h-screen bg-[#f2f2f2] py-6">
      <div className="relative mx-auto w-[794px] bg-white text-black px-12 py-10 shadow-sm print:shadow-none print:bg-white font-[Arial]">
        {/* Marca d'água */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10 rotate-[-24deg] select-none">
          <div className="text-[78px] font-black leading-none text-gray-400 tracking-[4px] text-center">
            CUPOM<br />GARANTIA<br />NÃO FISCAL
          </div>
        </div>

        <header className="relative z-10 flex items-start justify-between mb-7">
          <div className="flex-1" />
          <div className="flex flex-col items-center flex-[1.2] gap-1">
            <Title>Nota de Garantia de Serviço – 90 dias:</Title>
            <div className="text-[13px] leading-[16px] font-semibold">{data.empresa}</div>
          </div>
          <div className="flex items-center gap-2 flex-1 justify-end text-[14px]">
            <Label>DATA:</Label>
            <div className="min-w-[80px] border-b border-black text-[14px] leading-[18px]">{data.data}</div>
          </div>
        </header>

        <section className="relative z-10 space-y-3 mb-6">
          <Line>
            <Label>Empresa / Prestador:</Label>
            <div className="text-[14px]">{data.empresa}</div>
          </Line>
          <Line>
            <Label>CNPJ / CPF:</Label>
            <div className="text-[14px]">{data.cnpj}</div>
          </Line>
          <Line>
            <Label>Endereço:</Label>
            <div className="text-[14px]">{data.endereco}</div>
          </Line>
          <Line>
            <Label>Telefone / WhatsApp:</Label>
            <div className="text-[14px]">{data.telefone}</div>
          </Line>
        </section>

        <section className="relative z-10 space-y-3 mb-6">
          <Line>
            <Label>Cliente:</Label>
            <div className="text-[14px]">{data.cliente}</div>
          </Line>
          <Line>
            <Label>CPF:</Label>
            <div className="text-[14px]">{data.cpf}</div>
          </Line>
        </section>

        <section className="relative z-10 space-y-3 mb-6">
          <Line>
            <Label>Serviço Executado:</Label>
            <div className="text-[14px]">{data.servico}</div>
          </Line>
          <Line>
            <Label>Data da Execução:</Label>
            <div className="text-[14px]">{data.dataExecucao}</div>
          </Line>
          <Line>
            <Label>Prazo de Garantia:</Label>
            <div className="text-[14px]">{data.prazo}</div>
          </Line>
          <Line>
            <Label>Validade da Garantia:</Label>
            <div className="text-[14px]">{data.validade}</div>
          </Line>
        </section>

        <section className="relative z-10 mt-8">
          <h2 className="text-[20px] font-black text-center mb-4 tracking-[0.3px]">TERMOS DA GARANTIA</h2>
          <ol className="list-decimal list-inside space-y-3 text-[14px] leading-[19px]">
            <li>
              A garantia cobre apenas falhas relacionadas ao serviço realizado. Não cobre mau uso, danos acidentais,
              intervenção de terceiros, desgaste natural ou fatores externos.
            </li>
            <li>
              Se a falha estiver ligada ao serviço executado, o reparo será feito sem custo. Se não estiver, poderá haver
              cobrança.
            </li>
            <li>
              O cliente deve comunicar qualquer falha imediatamente e permitir avaliação técnica.
            </li>
            <li>
              A validade da garantia é a indicada neste documento; após este prazo, novas intervenções serão cobradas.
            </li>
          </ol>
        </section>

        <section className="relative z-10 mt-12 flex items-center justify-between text-[13px]">
          <div className="w-[40%] text-center">
            <div className="border-t border-black pt-2 font-semibold leading-[16px]">{data.assinaturaPrestador}</div>
            <div className="text-[12px]">Tecnico Responsavel</div>
          </div>
          <div className="w-[40%] text-center">
            <div className="border-t border-black pt-2 font-semibold leading-[16px]">{data.assinaturaCliente}</div>
            <div className="text-[12px]">Cliente</div>
          </div>
        </section>
      </div>
    </main>
  )
}
