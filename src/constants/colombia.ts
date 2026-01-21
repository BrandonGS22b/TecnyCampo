// src/constants/colombia.ts

export const COLOMBIA_DATA = [
    {
        department: "Amazonas",
        municipalities: ["Leticia", "Puerto Nariño"]
    },
    {
        department: "Antioquia",
        municipalities: ["Medellín", "Bello", "Itagüí", "Envigado", "Apartadó", "Rionegro", "Turbo", "Caucasia"]
    },
    {
        department: "Arauca",
        municipalities: ["Arauca", "Arauquita", "Saravena", "Tame"]
    },
    {
        department: "Atlántico",
        municipalities: ["Barranquilla", "Soledad", "Malambo", "Sabanalarga", "Baranoa"]
    },
    {
        department: "Bolívar",
        municipalities: ["Cartagena", "Magangué", "Turbaco", "Arjona", "El Carmen de Bolívar"]
    },
    {
        department: "Boyacá",
        municipalities: ["Tunja", "Duitama", "Sogamoso", "Chiquinquirá", "Puerto Boyacá"]
    },
    {
        department: "Caldas",
        municipalities: ["Manizales", "La Dorada", "Riosucio", "Chinchiná", "Villamaría"]
    },
    {
        department: "Caquetá",
        municipalities: ["Florencia", "San Vicente del Caguán", "Puerto Rico"]
    },
    {
        department: "Casanare",
        municipalities: ["Yopal", "Aguazul", "Paz de Ariporo", "Villanueva"]
    },
    {
        department: "Cauca",
        municipalities: ["Popayán", "Santander de Quilichao", "Puerto Tejada", "El Tambo"]
    },
    {
        department: "Cesar",
        municipalities: ["Valledupar", "Aguachica", "Agustín Codazzi", "Bosconia", "Curumaní"]
    },
    {
        department: "Chocó",
        municipalities: ["Quibdó", "Istmina", "Condoto", "El Carmen de Atrato"]
    },
    {
        department: "Córdoba",
        municipalities: ["Montería", "Cereté", "Sahagún", "Lorica", "Montelíbano"]
    },
    {
        department: "Cundinamarca",
        municipalities: ["Bogotá", "Soacha", "Fusagasugá", "Facatativá", "Zipaquirá", "Chía", "Girardot"]
    },
    {
        department: "Guainía",
        municipalities: ["Inírida"]
    },
    {
        department: "Guaviare",
        municipalities: ["San José del Guaviare", "Retorno"]
    },
    {
        department: "Huila",
        municipalities: ["Neiva", "Pitalito", "Garzón", "La Plata"]
    },
    {
        department: "La Guajira",
        municipalities: ["Riohacha", "Maicao", "Uribia", "Manaure", "San Juan del Cesar"]
    },
    {
        department: "Magdalena",
        municipalities: ["Santa Marta", "Ciénaga", "Fundación", "El Banco", "Plato"]
    },
    {
        department: "Meta",
        municipalities: ["Villavicencio", "Acacías", "Granada", "Puerto López"]
    },
    {
        department: "Nariño",
        municipalities: ["Pasto", "Tumaco", "Ipiales", "Túquerres"]
    },
    {
        department: "Norte de Santander",
        municipalities: ["Cúcuta", "Ocaña", "Villa del Rosario", "Los Patios", "Pamplona"]
    },
    {
        department: "Putumayo",
        municipalities: ["Mocoa", "Puerto Asís", "Orito", "Valle del Guamuez"]
    },
    {
        department: "Quindío",
        municipalities: ["Armenia", "Calarcá", "La Tebaida", "Montenegro", "Quimbaya"]
    },
    {
        department: "Risaralda",
        municipalities: ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia"]
    },
    {
        department: "San Andrés y Providencia",
        municipalities: ["San Andrés", "Providencia"]
    },
    {
        department: "Santander",
        municipalities: ["Bucaramanga", "Floridablanca", "Barrancabermeja", "Girón", "Piedecuesta", "San Gil", "Socorro", "Vélez", "Barbosa", "Zapatoca"]
    },
    {
        department: "Sucre",
        municipalities: ["Sincelejo", "Corozal", "San Marcos", "Sampués"]
    },
    {
        department: "Tolima",
        municipalities: ["Ibagué", "Espinal", "Chaparral", "Líbano", "Melgar", "Mariquita"]
    },
    {
        department: "Valle del Cauca",
        municipalities: ["Cali", "Buenaventura", "Palmira", "Tuluá", "Yumbo", "Cartago", "Buga", "Jamundí"]
    },
    {
        department: "Vaupés",
        municipalities: ["Mitú"]
    },
    {
        department: "Vichada",
        municipalities: ["Puerto Carreño", "Cumaribo"]
    }
];

export const DEPARTMENTS = COLOMBIA_DATA.map(d => d.department).sort();

export const getMunicipalities = (departmentName: string) => {
    const dept = COLOMBIA_DATA.find(d => d.department === departmentName);
    return dept ? dept.municipalities.sort() : [];
};
