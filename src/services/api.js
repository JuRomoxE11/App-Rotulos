export const buscarOrdenes = async (numero) => {
  try {
    const response = await fetch(`http://localhost:3001/api/ordenes/buscar?numero=${numero}`);
    if (!response.ok) {
      throw new Error(`Error HTTP! estado: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error al buscar orden:", error);
    throw error;
  }
};