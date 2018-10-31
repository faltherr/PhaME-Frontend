import React from 'react';
import ControlledCarousel from './ImageCaourselBootstrap'
import '../../styles/home.css'

export default function Home() {
  return (
    <div className='home-text'>
      <p>** Beta version **</p>
      <h1 className='phame-header'>PhaME</h1>
      <h3>Phylogenetic Analysis and Molecular Evolution</h3>
      <div className='description-text-home-container'>
      <p>PhaME is a whole-genome SNP-based tool that calculates core genome and SNPs, parse them to coding or non-coding regions, identify synonymous and non-synonymous SNPs, reconstruct phylogeny, and perform molecular evolutionary analysis to identify genes under selection from finished genomes, contigs, and/or raw FASTQ reads. </p>
      </div>
      <div className='image-carousel-container'>
        <ControlledCarousel/>
      </div>
    </div>
  )
}