# Generated by Django 4.1 on 2022-08-08 07:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ProteinModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('protein_id', models.IntegerField()),
                ('average_mass', models.PositiveIntegerField()),
                ('accession', models.TextField()),
                ('cellular_processes', models.TextField(blank=True)),
                ('protein_functions', models.TextField(blank=True)),
                ('reactome_pathways', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ProteinAbundanceModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('protein_abundance', models.PositiveBigIntegerField()),
                ('hour', models.FloatField()),
                ('protein_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='protein_abundance', to='api.proteinmodel')),
            ],
        ),
    ]