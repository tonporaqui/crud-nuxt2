<!-- pages/report.vue -->
<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Reporte</h1>
                <v-btn color="primary" @click="fetchPdfReport">Generar Reporte PDF</v-btn>
                <v-btn color="success" @click="fetchExcelReport">Generar Reporte Excel</v-btn>
                <v-btn color="info" @click="fetchWordReport">Generar Reporte Word</v-btn>
                <embed v-if="reportData" :src="pdfSrc" width="100%" height="600px" />
            </v-col>
        </v-row>
    </v-container>
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
    methods: {
        /**
         * Fetches the PDF report asynchronously.
         *
         * @return {Promise} A promise that resolves with the PDF report data.
         */
        async fetchPdfReport()
        {
            try
            {
                const reportBase64 = await this.$store.dispatch('report/fetchPdfReport');
                this.reportData = reportBase64;
                this.pdfSrc = `data:application/pdf;base64,${reportBase64}`;
            } catch (error)
            {
                console.error('Error al cargar el reporte PDF', error);
            }
        },
        /**
         * Fetches the Excel report asynchronously.
         *
         * @return {Promise<void>} - A promise that resolves when the report is fetched successfully.
         */
        async fetchExcelReport()
        {
            try
            {
                const reportBase64 = await this.$store.dispatch('report/fetchExcelReport');
                this.downloadExcelReport(reportBase64);
            } catch (error)
            {
                console.error('Error al cargar el reporte Excel', error);
            }
        },
        /**
         * Asynchronously fetches the word report.
         *
         * @return {Promise<void>} - A promise that resolves when the report is fetched.
         */
        async fetchWordReport()
        {
            try
            {
                const reportBase64 = await this.$store.dispatch('report/fetchWordReport');
                this.downloadWordReport(reportBase64);
            } catch (error)
            {
                console.error('Error al cargar el reporte Word', error);
            }
        },
        /**
         * Downloads an Excel report using the provided base64 data.
         *
         * @param {string} base64Data - The base64-encoded data for the Excel file.
         */
        downloadExcelReport(base64Data)
        {
            const link = document.createElement('a');
            link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64Data}`;
            link.download = 'reporteUsuarios.xlsx';
            link.click();
        },
        /**
         * Downloads a Word report.
         *
         * @param {string} base64Data - The base64-encoded data of the Word document.
         */
        downloadWordReport(base64Data)
        {
            const link = document.createElement('a');
            link.href = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${base64Data}`;
            link.download = 'reporteUsuarios.docx';
            link.click();
        }
    }
};
</script>
