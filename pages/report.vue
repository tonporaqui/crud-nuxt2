<!-- pages/report.vue -->
<template>
    <div>
        <h1>Reporte</h1>
        <iframe v-if="reportData" :src="pdfSrc" width="100%" height="600px"></iframe>
    </div>
</template>

<script>
export default {
    data()
    {
        return {
            reportData: null,
            pdfSrc: null,
        };
    },
    async created()
    {
        try
        {
            const reportBase64 = await this.$store.dispatch('report/fetchReport');
            this.reportData = reportBase64;
            this.pdfSrc = `data:application/pdf;base64,${reportBase64}`;
        } catch (error)
        {
            console.error('Error al cargar el reporte', error);
        }
    }
};
</script>
