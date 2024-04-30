import React, { useRef, useState } from 'react';
import UploadIcon from 'assets/icons/upload-icon.svg'
import DocumentIcon from 'assets/icons/document-icon.svg'
import { map } from 'zod';

function FileChooserSection({ label, subLabel, id, icon, register, multiple = false, supportedFormats = [], comboBoxData = [], ...rest }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);

    const handleFileInputChange = (event) => {
        setSelectedFiles(Array.from(event.target.files));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const files = Array.from(event.dataTransfer.files);
        setSelectedFiles(files);
    };

    const openFileDialog = () => {
        fileInputRef.current.click();
    };

    const acceptTypes = supportedFormats.map(format => `.${format}`).join(', ');

    const renderSupportedFileTypes = () => {
        if (supportedFormats.length === 0) return null;
        return (
            <div className='text-sm text-muted-foreground'>
                {supportedFormats.map(e => e.toUpperCase()).join(', ')} :يمكنك رفع الملفات من نوع
            </div>
        );
    }

    return (
        <div className='flex gap-12 w-full flex-row-reverse'>
            <div className='flex-col text-right w-52'>
                <label className='text-sm font-semibold text-black'>{label}</label><br />
                {subLabel && <span className='text-sm text-muted-foreground'>{subLabel}</span>}
            </div>
            <div className="flex flex-col">
                <div
                    className='flex flex-col justify-center items-center gap-3 focus-within:outline w-[400px] h-[126px] focus-within:outline-primary focus-within:border-transparent bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden cursor-pointer'
                    onClick={openFileDialog}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    <img src={UploadIcon} alt='upload icon' className='size-10' />
                    <div className='text-[14px]'><span className='text-[#6941C6] font-semibold'>اضغط لرفع الملف</span> او اسحب الملف هنا</div>
                    <div className='text-[14px]'>{renderSupportedFileTypes()}</div>
                    <input
                        type="file"
                        id={id}
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileInputChange}
                        accept={acceptTypes}
                        multiple={multiple}

                    />
                </div>
                <br />
                {selectedFiles.length > 0 && (
                    <div className='flex flex-col gap-1'>
                        {selectedFiles.map((file) => (
                            <div className='flex flex-row-reverse justify-start items-center px-3 gap-3 focus-within:outline w-[400px] h-[72px] focus-within:outline-primary focus-within:border-transparent bg-white font-medium box-border rounded-lg border border-accent-100 outline-none shadow-sm overflow-hidden'>
                                <img src={DocumentIcon} alt='document icon' className='size-10' />
                                <div
                                    className='flex flex-col '
                                    key={file.name}
                                >
                                    <div className='text-[14px] font-semibold font-inter'>{file.name}</div>
                                    <div className='text-[14px] text-muted-foreground font-inter'>{file.size} bytes</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default FileChooserSection;
