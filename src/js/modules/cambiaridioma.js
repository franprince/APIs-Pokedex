function idiomaSeleccionado(idioma) {
    const idiomaTexto = {
        es: { altura: "Altura", peso: "Peso", habilidades: "Habilidades", categoria: "Categoría", descripcion: "Descripción" },
        en: { altura: "Height", peso: "Weight", habilidades: "Abilities", categoria: "Category", descripcion: "Description" },
        ja: { altura: "高さ", peso: "重量", habilidades: "能力", categoria: "カテゴリー", descripcion: "説明" },
        de: { altura: "Höhe", peso: "Gewicht", habilidades: "Fähigkeiten", categoria: "Kategorie", descripcion: "Beschreibung" },
        fr: { altura: "Poids", peso: "Taille", habilidades: "Capacités", categoria: "Catégorie", descripcion: "Description" }
    }
    return idiomaTexto[idioma]
};

export default idiomaSeleccionado;
